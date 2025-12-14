import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required.").min(3, "Username must be at least 3 characters."),
  email: Yup.string().required("Email is required.").email("Invalid email address."),
  password: Yup.string().required("Password is required.").min(6, "Password must be at least 6 characters."),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const FormikForm = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Formik Registration Data Submitted:", values);

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2) + "\n\nRegistration Successful!");
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2>User Registration (Formik + Yup)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username">Username:</label>
              <Field type="text" name="username" style={inputStyle} />
              <ErrorMessage
                name="username"
                component="div"
                style={errorStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" style={inputStyle} />
              <ErrorMessage name="email" component="div" style={errorStyle} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" style={inputStyle} />
              <ErrorMessage
                name="password"
                component="div"
                style={errorStyle}
              />
            </div>

            <button type="submit" disabled={isSubmitting} style={buttonStyle}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;

const inputStyle = { width: "100%", padding: "8px", boxSizing: "border-box" };
const errorStyle = { color: "red", fontSize: "12px", margin: "4px 0 0 0" };
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
