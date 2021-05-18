import React, { useEffect, useRef } from 'react';

// Triggers only on dependency changes and NOT on state initialisation
const useDidMountEffect = (func: () => void, deps: React.DependencyList | undefined) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) { func(); }
        else { didMount.current = true; }
    }, deps);
};

export default useDidMountEffect;