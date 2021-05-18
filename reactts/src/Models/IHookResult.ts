export default interface IHookResult <T> 
{
    result: T;
    loading: boolean;
    errorMessage?: string;
    error?: any;
}