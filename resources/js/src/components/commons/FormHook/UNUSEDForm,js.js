const FormType = (eachJSONKey, index) => {
    switch (formConstant[eachJSONKey].type) {
        case "TEXT":
            return (
                <Grid item xs={12} sm={eachWidth}>
                    <TextBox
                        value={formValue[eachJSONKey]}
                        type={formConstant[eachJSONKey].inputType}
                        label={formConstant[eachJSONKey].label}
                        onChange={handleFormInput(eachJSONKey)}
                    />
                </Grid>
            );
        case "SELECT":
            return (
                <Grid key={index} item xs={12} sm={eachWidth}>
                    <Select
                        value={formValue[eachJSONKey] ? formValue[eachJSONKey] : ""}
                        type={formConstant[eachJSONKey].inputType}
                        label={formConstant[eachJSONKey].label}
                        options={formConstant[eachJSONKey].options}
                        onChange={handleFormInput(eachJSONKey)}
                    />
                </Grid>
            );
        case "DATE":
            return (
                <Grid item xs={12} sm={eachWidth}>
                    <TextBox
                        value={formValue[eachJSONKey]}
                        type={formConstant[eachJSONKey].inputType}
                        labelForDate={formConstant[eachJSONKey].label}

                        showLabel={false}
                        onChange={handleFormInput(eachJSONKey)}
                    />
                </Grid>
            );
        case "CHECK":
            return (
                <Grid key={index} item xs={12} sm={eachWidth}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formValue[eachJSONKey] === 1 ? true : false}
                                onChange={handleFormInput(eachJSONKey, formConstant[eachJSONKey].type)}
                                color="primary" size="small" />
                        }

                        label={formConstant[eachJSONKey].label}
                        className={classes.checkLabel}
                        labelPlacement="end"
                    />

                </Grid>
            )
        case "IMAGE":
            return (
                <Grid item xs={12} sm={eachWidth}>
                    <FileInput
                        width={formConstant[eachJSONKey].width}
                        height={formConstant[eachJSONKey].height}
                        isImage={formConstant[eachJSONKey].isImage}
                        onChange={handleFileInput(eachJSONKey)}
                    />
                </Grid>
            );
        case "FILE":
            return (
                <Grid item xs={12} sm={eachWidth}>
                    <FileInput
                        width={formConstant[eachJSONKey].width}
                        height={formConstant[eachJSONKey].height}
                        onChange={handleFileInput(eachJSONKey)}
                    />
                </Grid>
            );
        default:
            return;

    }
}
