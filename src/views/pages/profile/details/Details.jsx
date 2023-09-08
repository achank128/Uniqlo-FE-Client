import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../redux/slices/authSlice';

const Details = () => {
  const currentUser = useSelector(userSelector);

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="heading">
          <h3>PROFILE</h3>
        </div>
        <div className="item-info">
          <h4>EMAIL ADDRESS</h4>
          <p>{currentUser.email}</p>
        </div>
        <div className="item-info">
          <h4>BIRTHDAY</h4>
          <p>{currentUser.birthday?.slice(0, 10)}</p>
        </div>
        <div className="item-info">
          <h4>GENDER</h4>
          <p className="gender">{currentUser.gender}</p>
        </div>
        {/* <button
                    className="btn-change-pass"
                    onClick={() => setShowChangePass(!showChangePass)}
                  >
                    Change Password
                  </button> */}
      </div>
      {/* <div className={showChangePass ? 'change-pass active' : 'change-pass'}>
                  <form>
                    {errorPass ? (
                      <p className="error">{msg}</p>
                    ) : (
                      <p>*Please enter your old Password</p>
                    )}
                    <label>OLD PASSWORD</label>
                    <div className="input">
                      <input
                        required
                        type="password"
                        className={errorPass ? 'error-input' : ''}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <label>NEW PASSWORD</label>
                    <div className="input">
                      <input
                        required
                        type="password"
                        className={errorPass ? 'error-input' : ''}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button className="btn-update" onClick={handleUpdate}>
                      UPDATE PASSWORD
                    </button>
                  </form>
                </div> */}
    </div>
  );
};

export default Details;
