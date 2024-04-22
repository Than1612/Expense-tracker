import React, { useState } from 'react';
import './reg.css';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const predefinedCredentials = {
    username: 'Thanu Athitya',
    email: 'thanuathitya1612@gmail.com',
    password: 'Athitya@123',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = formData;
    const errors = {};

    if (username !== predefinedCredentials.username ||
        email !== predefinedCredentials.email ||
        password !== predefinedCredentials.password) {
      setFormErrors(errors);
      errors.general = 'Invalid credentials';
      return;
    }

    onSubmit(formData);
    setFormData({ username: '', email: '', password: '' });
    setFormErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return <p>Redirecting to next page...</p>;
  }

  return (
    <div className="design">
    <div className="registration-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {formErrors.general && <span className="error">{formErrors.general}</span>}
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
};

export default RegistrationForm;
