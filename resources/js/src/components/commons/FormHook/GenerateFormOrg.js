import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	Grid,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";
import clsx from "clsx";
import TextBox from "../Input/TextBox";
import HOCTextBox from "../HOCInput/TextBox";
import Select from "../Input/Select";
import FileInput from "../Input/FileInput";
import { useForm, Controller } from "react-hook-form";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
	root: {},
	label: {
		"& .Mui-required .MuiFormLabel-asterisk": {
			color: theme.palette.ascents.orange,
		},
	},
	checkLabel: {
		"& .MuiTypography-body1": {
			fontSize: "12px",
		},
	},
}));

const GenerateFormOrg = ({
	formConstant,
	formLabel = null,
	formValue,
	handleFormInput = () => { },
	handleFileInput = () => { },
	addPhoneHandler = () => { },
	deletePhoneHandler = () => { },
	viewMode,
	eachWidth = 4,
	ascent,
	className,
	control,
	children,
	...props
}) => {
	const classes = useStyles({ ascent });

	const FormType = (eachJSONKey, index) => {
    /* 
      Aap purana wala code ke sath kam krdo,
      sirf apne branch m push rkhiye ga iska alag branch create
      krke hm isko solve krdnge.
      Ye baat meet m boldete pr scha thora aur time waste krlete hain
    */
		switch (formConstant[eachJSONKey].type) {
			case "TEXT":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
								<TextBox
									parentClassName={classes.label}
									type={formConstant[eachJSONKey].inputType}
									label={formConstant[eachJSONKey].label}
									readOnly={formConstant[eachJSONKey].isReadOnly ||viewMode}
								/>
							}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "SELECT":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
								<Select
									parentClassName={classes.label}
									label={formConstant[eachJSONKey].label}
									options={formConstant[eachJSONKey].options}
									readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
								/>
							}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "DATE":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
								<TextBox
									parentClassName={classes.label}
									type={formConstant[eachJSONKey].inputType}
									labelForDate={formConstant[eachJSONKey].label}
									showLabel={false}
									readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
								/>
							}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "CHECK":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
										<Checkbox
											// checked={formValue[eachJSONKey] === 1 ? true : false}

											color="primary"
											size="small"
										/>
							}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "IMAGE":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							render={({ onChange, name, value }) => (
								<FileInput
									onChange={(e) => onChange(e.target.files)}
									name={name}
									// value={value}
									width={formConstant[eachJSONKey].width}
									height={formConstant[eachJSONKey].height}
									isImage={formConstant[eachJSONKey].isImage}
									readOnly={formConstant[eachJSONKey].isReadOnly}
									label={formConstant[eachJSONKey].label}
									previewImg={
										value && value.length > 0 && URL.createObjectURL(value[0])
									}
									imageName={value && value.length > 0 && value[0].name}
								/>
							)}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "FILE":
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
								<FileInput
									label={formConstant[eachJSONKey].label}
									width={formConstant[eachJSONKey].width}
									height={formConstant[eachJSONKey].height}
									readOnly={formConstant[eachJSONKey].isReadOnly || viewMode}
								/>
							}
							control={control}
							name={
								formConstant[eachJSONKey].object
									? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}`
									: formConstant[eachJSONKey].jsonKey
							}
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
			case "PHONE_BOOK":
				return (
					<Grid key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`} item xs={12} sm={12}>
						{formConstant[eachJSONKey].children.map((ele, i) => {
							const keys = Object.keys(ele);
							return (
								<Grid container spacing={3}>
									<Grid key={`${keys[0]}` + i} item xs={5}>
										<Controller
											defaultValue={""}
											as={
												<Select
													parentClassName={classes.label}
													label={`${ele[keys[0]].label} ${i ? i : ""}`}
													options={ele[keys[0]].options}
													readOnly={ele[keys[0]].isReadOnly || viewMode}
												/>
											}
											control={control}
											name={
												formConstant[eachJSONKey].object
													? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}-${keys[0]}-${i}`
													: formConstant[eachJSONKey].jsonKey
											}
											rules={ele[keys[0]].rules}
										/>
									</Grid>
									<Grid key={ele[keys[1]] + i} item xs={5}>
										<Controller
											defaultValue={""}
											as={
												<TextBox
													parentClassName={classes.label}
													label={`${ele[keys[1]].label} ${i ? i : ""}`}
													options={ele[keys[1]].options}
													readOnly={ele[keys[1]].isReadOnly || viewMode}
												/>
											}
											control={control}
											name={
												formConstant[eachJSONKey].object
													? `${formConstant[eachJSONKey].object}-${formConstant[eachJSONKey].jsonKey}-${keys[1]}-${i}`
													: formConstant[eachJSONKey].jsonKey
											}
											rules={ele[keys[1]].rules}
										/>
									</Grid>
									<Grid item xs={1}>
										{
											<AddCircleIcon
												// disabled={readOnly}
												style={{ cursor: "pointer" }}
												color={"primary"}
												onClick={() => addPhoneHandler(eachJSONKey, i)}
											/>
										}
									</Grid>
									<Grid item xs={1}>
										{formConstant[eachJSONKey].children.length > 1 ? (
											<HighlightOffIcon
												// disabled={readOnly}
												style={{ cursor: "pointer" }}
												color={"primary"}
												onClick={() => deletePhoneHandler(eachJSONKey, i)}
											/>
										) : null}
									</Grid>
								</Grid>
							);
						})}
					</Grid>
				);

			default:
				return (
					<Grid
						key={`${formConstant[eachJSONKey].object}-${index}-${formConstant[eachJSONKey].jsonKey}`}
						item
						xs={12}
						sm={formConstant[eachJSONKey].eachWidth || eachWidth}
					>
						<Controller
							defaultValue={""}
							as={
								<TextBox
									parentClassName={classes.label}
									type={formConstant[eachJSONKey].inputType}
									label={formConstant[eachJSONKey].label}
									readOnly={formConstant[eachJSONKey].isReadOnly}
								/>
							}
							control={control}
              name={
                formConstant[eachJSONKey].object
                  ? `${formConstant[eachJSONKey].object}-${eachJSONKey}`
                  : eachJSONKey
              }
							rules={formConstant[eachJSONKey].rules}
						/>
					</Grid>
				);
		}
	};

	return (
		<Grid container spacing={2}>
			{Object.keys(formConstant).map(FormType)}
		</Grid>
	);
};

GenerateFormOrg.propTypes = {};

export default GenerateFormOrg;




{/* <Grid key={eachJSONKey} item xs={12} sm={eachWidth}>
<Controller
  defaultValue={""}
  as={
    <TextBox
      parentClassName={classes.label}
      required={formConstant[eachJSONKey].required}
      control={control}
      type={formConstant[eachJSONKey].inputType}
      label={formConstant[eachJSONKey].label}
      readOnly={formConstant[eachJSONKey].isReadOnly}
    />
  }
  control={control}
  name={
    formConstant[eachJSONKey].object
      ? `${formConstant[eachJSONKey].object}-${eachJSONKey}`
      : eachJSONKey
  }
  rules={formConstant[eachJSONKey].rules}
/>
</Grid> */}