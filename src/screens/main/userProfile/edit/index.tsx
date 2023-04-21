import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, VStack, Button, FormControl } from "native-base";
import Input from "../../../../components/form/input";
import Header from "../../../../components/header";
import useTheme from "../../../../hooks/useTheme";
import EditAvatar from "./editAvatar";
import { useFormik, FormikValues } from "formik";
import * as Yup from "yup";
import DatePicker from "../../../../components/form/datepicker";

const EditProfilePage = () => {
  const theme = useTheme();
  const initialValues = {
    dateOfBirth: new Date(),
    country: "",
    bio: "",
    avatar: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    bio: Yup.string(),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = (values: FormikValues) => {
    // handle submit logic here
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleDateOfBirthChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formik.values.dateOfBirth;
    formik.setFieldValue("dateOfBirth", currentDate);
  };

  const handleAvatarChange = () => {
    // handle avatar change logic here
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.black, flex: 1 }}>
      <VStack>
        <Header title="Edit Profile" />
        <VStack style={{ padding: 20 }}>
          <EditAvatar avatar="https://randomuser.me/api/portraits/women/2.jpg" />
          <Input
            label="Bio"
            value={formik.values.bio}
            onChangeText={formik.handleChange("bio")}
            error={formik.touched.bio && (formik.errors.bio as string)}
          />
          <DatePicker
            label="Date of Birth"
            style={{ width: "100%" }}
            value={formik.values.dateOfBirth}
            mode="date"
            onChange={handleDateOfBirthChange}
            error={
              formik.touched.dateOfBirth &&
              (formik.errors.dateOfBirth as string)
            }
          />

          <Input
            label="Country"
            value={formik.values.country}
            onChangeText={formik.handleChange("country")}
            error={formik.touched.country && formik.errors.country}
          />
          <Input
            label="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            error={formik.touched.password && formik.errors.password}
            secureTextEntry
            placeholder="New Password"
          />

          <Button onPress={() => formik.handleSubmit}>Save</Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "dity",
    color: "#fff",
  },
});

export default EditProfilePage;
