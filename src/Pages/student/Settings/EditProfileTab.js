import React from 'react';

const EditProfileTab = () => {
  return (
    <div>
      <h2>Change Password</h2>
      <form>
        <label>Old Password</label>
        <input type="password" name="oldPassword" /><br />
        <label>New Password</label>
        <input type="password" name="newPassword" /><br />
        <label>Confirm New Password</label>
        <input type="password" name="confirmNewPassword" /><br />
        <button type="submit">Delete Account</button>
        <button type="button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfileTab;
