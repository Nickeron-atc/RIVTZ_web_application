import React from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef((props, ref) => {
    const { tdt, ...restProps } = props;

    if (tdt === "textarea") {
        return (
            <textarea ref={ref} className={classes.myInput} {...restProps} />
        );
    }

    return (
        <input ref={ref} className={classes.myInput} {...restProps} />
    );
});

export default MyInput;
