import React, { useEffect, useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
//components
import Loading from '../../components/loading/Loading';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import authApi from '../../../api/apiAuth';
import { useDispatch } from 'react-redux';
import { authAction } from '../../../redux/slices/authSlice';

const genders = ['male', 'female', 'unselect'];

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [errorAgree, setErrorAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg('Please provide Email and Password');
      setError(true);
      window.scrollTo(0, 0);
    }
    if (error) window.scrollTo(0, 0);
    if (isAgree) {
      try {
        setError(false);
        setLoading(true);
        const body = { email, password, birthday, gender };
        const res = await authApi.register(body);
        dispatch(authAction.handleLogin(res.data));
        toast.success(t(res.message));
        setLoading(false);
        navigate('/');
      } catch (error) {
        setLoading(false);
        setError(true);
        toast.error(t(error.response.data.Message));
        setMsg(t(error.response.data.Message));
        window.scrollTo(0, 0);
      }
    } else {
      setErrorAgree(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <div id="loading-overlay">
          <Loading />
        </div>
      ) : null}
      <div id="register">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{t('auth_create_account')}</li>
              </ul>
            </div>
            <div className="title">
              <h2>{t('auth_create_account')}</h2>
              <span className="lock">
                <LockOutlined />
              </span>
            </div>
            <div className="register-content">
              <div className="text-info">
                {error ? (
                  <p className="error">{msg}</p>
                ) : (
                  <p>{t('auth_confirmation_email_desc')}</p>
                )}
                <div className="required">{t('common_required')}*</div>
              </div>
              <form>
                <div className="input-container">
                  <label className={error ? 'label error' : 'label'}>
                    {t('auth_email_address')}
                    <span>*</span>
                  </label>
                  <div className="email-input">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('auth_email_placehoder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={error ? 'error-input' : ''}
                      onFocus={() => setError(false)}
                    />
                  </div>
                </div>

                <div className="input-container">
                  <label className={error ? 'label error' : 'label'}>
                    {t('auth_password')}
                    <span>*</span>
                  </label>
                  <div className="pass-input">
                    <input
                      placeholder={t('auth_password')}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={error ? 'error-input' : ''}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setError(false)}
                    />
                    <p className="pass-text">{t('auth_password_desc')}</p>
                  </div>
                </div>

                <label className="checkbox-input">
                  <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                  <span className="checkmark"></span>
                  {t('auth_show_password')}
                </label>

                <div className="input-container">
                  <label className="label">{t('auth_birthday')}</label>
                  <div className="birthday-input">
                    <input
                      name="birthday"
                      placeholder=""
                      autoComplete="on"
                      type="date"
                      onChange={(e) => setBirthday(e.target.value)}
                      max="2020-01-01"
                      min="1922-04-27"
                    />
                    <p className="birthday-text">{t('auth_birthday_desc')}</p>
                  </div>
                </div>

                <div className="input-container">
                  <label className="label">{t('auth_gender')}</label>
                  <div className="radio-input">
                    <label>
                      <input
                        type="radio"
                        name="gender-option"
                        value="1"
                        checked={gender === '1'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <span>{t('auth_gender_male')}</span>
                    </label>
                  </div>
                  <div className="radio-input">
                    <label>
                      <input
                        type="radio"
                        name="gender-option"
                        value="0"
                        checked={gender === '0'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <span>{t('auth_gender_female')}</span>
                    </label>
                  </div>
                  <div className="radio-input">
                    <label>
                      <input
                        type="radio"
                        name="gender-option"
                        value="2"
                        checked={gender === '2'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className="checkmark"></span>
                      <span>{t('auth_gender_unselect')}</span>
                    </label>
                  </div>
                </div>

                <label className="subscribe-label">{t('auth_subscribe')}</label>
                <label className="checkbox-input">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  {t('auth_uniqlo_e_newsletter')}
                </label>

                <div className="notify-privacy">
                  <h3>{t('auth_push_noti_privacy')}</h3>
                  <div>{t('auth_push_noti_privacy_1')}</div>
                  <p>{t('auth_push_noti_privacy_1_desc')}</p>
                  <div>{t('auth_push_noti_privacy_2')}</div>
                  <p>{t('auth_push_noti_privacy_2_desc')}</p>
                  <label className="checkbox-input">
                    <input type="checkbox" name="push-1" />
                    <span className="checkmark"></span>
                    {t('auth_push_notification')}
                  </label>
                  <div>{t('auth_push_noti_privacy_3')}</div>
                  <p>{t('auth_push_noti_privacy_3_desc')}</p>
                  <label className="checkbox-input">
                    <input type="checkbox" name="push-2" />
                    <span className="checkmark"></span>
                    {t('auth_push_notification')}
                  </label>
                </div>
                <div className="submit">
                  <div className="membership-label">{t('auth_membership_agree')}</div>
                  {errorAgree ? (
                    <p className="error agree-desc">{t('auth_agree_error')}</p>
                  ) : (
                    <p className="agree-desc">{t('auth_membership_agree_desc')}</p>
                  )}
                  <label className="checkbox-input">
                    <input
                      type="checkbox"
                      onClick={() => {
                        setIsAgree(!isAgree);
                      }}
                    />
                    <span className={errorAgree ? 'checkmark error' : 'checkmark'}></span>
                    {t('auth_membership_agree_check')}
                  </label>
                  <Box sx={{ mb: 2 }} />
                  <div className="term-privacy">
                    <span className="term">{t('common_terms_of_use')}</span>
                    <span className="privacy">{t('common_privacy_policy')}</span>
                  </div>
                  <button className="register-submit" type="submit" onClick={handleRegister}>
                    {t('auth_register')}
                  </button>
                </div>
              </form>
            </div>
            <div className="footer-register">
              <p>{t('footer_copyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
