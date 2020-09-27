import React from 'react';
import { useWatch } from "react-hook-form";

export function withFormWatcher(Component) {
    return ({ control, inputName, ...props }) => {

        const firstName = useWatch({
            control,
            name: inputName,
        });



        return <Component {...props} control={control} inputValue={firstName} />
    }
}