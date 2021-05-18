import IInspectionPlan from "../Models/IInspectionPlan";
import axios from "axios";
import Role from "./UserEnum";
import IUser from "../Models/IUser";
import React, { MutableRefObject, useRef, useState } from "react";
import useDidMountEffect from "./useDidMountEffect";
import IHookResult from "../Models/IHookResult";
import { useSetCurrentUserState } from "../contexts/userContext";
import IInspectionPlanFromDB from '../Models/IInspectionPlanFromDB';


export function uploadFileToBackend(InspectionPlan: IInspectionPlan, cb: Function): Boolean {
  const url = "http://localhost:3001/plans/uploadFile";
  const formData = new FormData();
  formData.append("file_upload", InspectionPlan.file);
  formData.append("inspectionPlanName", InspectionPlan.name);
  const config = {
    headers: {
      "content-type": "multipart/formdata",
    },
  };
  axios.post(url, formData, config).then((response: any) => {
    cb(response);
  });

  console.log("File wird an Backend geschickt.. ", InspectionPlan);
  return true;
}

export function updateInspectionPlan(inspectionPlan: IInspectionPlanFromDB, cb: Function) {
  const url = "http://localhost:3001/plans/updatePlan";
  cb(postData(url, {inspectionPlan}))
}

export function getAllFilesFromBackend(cb: Function) {
  axios
    .get("http://localhost:3001/plans/receive")
    .then((response: any) => {
      let data: IInspectionPlanFromDB[] = response.data;
      return cb(data);
    })
    .catch(() => {
      console.log("error on return");
    });
}

export function checkLoginData(username: string, password: string, callback: Function) {
  //Session Storage is persistent even when the user refreshes the site
  let userString: string = window.sessionStorage.getItem("currentUser") as string;
  let user: IUser = JSON.parse(userString);

  if (user !== null) {
    callback(true, user.role);
    return;
  }

  postData("http://localhost:3001/user/login", { username: username, password: password }).then((data) => {
    let role: Role = Role.worker;
    switch (data.role) {
      case "worker":
        role = Role.worker;
        break;
      case "preworker":
        role = Role.preworker;
        break;
      case "admin":
        role = Role.admin;
        break;
    }

    callback(data.valid, role);
  });
}

export async function getIUser(username: string, password: string): Promise<IUser> {
  //Session Storage is persistent even when the user refreshes the site
  let user: IUser = JSON.parse(window.sessionStorage.getItem("currentUser") as string);
  if (user) {
    // return user;
  }

  return new Promise(
    async (resolve: (value: IUser) => void, reject: (value: IUser) => void): Promise<void> => {
      postData("http://localhost:3001/user/login", { username: username, password: password }).then((data) => {
        let role: Role = Role.worker;
        console.log(data.role)
        switch (data.role) {
          case "0":
            role = Role.worker;
            break;
          case "1":
            role = Role.preworker;
            break;
          case "2":
            role = Role.admin;
            break;
        }
        user = { displayname: "Hans", username: username, password: password, role: role, loggedIn: data.valid };
        resolve(user);
      });
    }
  );
}

export function useLoginUser(username: string, password: string): IHookResult<IUser> {
  let user: IUser = {
    displayname: "Hans",
    username: username,
    password: password,
    role: Role.worker,
    loggedIn: false,
  };
  const [result, setResult] = useState<IUser>(user);
  const loading: MutableRefObject<boolean> = useRef(true);
  const setCurrentUserState = useSetCurrentUserState();

  useDidMountEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      try {
        loading.current = true;

        const user: IUser = await getIUser(username, password);
        loading.current = false;
        setCurrentUserState({ currentUser: user });
        setResult(user);
      } catch (error) {
        loading.current = true;
      }
    };
    fetchData();
  }, [username, password]);

  return { result, loading: loading.current };
}

// POST method:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
