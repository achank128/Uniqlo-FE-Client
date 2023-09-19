import React, { useEffect, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { InfoOutlined } from '@mui/icons-material';
import authApi from '../../../api/apiAuth';
//components
import Loading from '../../components/loading/Loading';
import { useDispatch } from 'react-redux';
import { authAction } from '../../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const res = await authApi.login({ email, password });
      dispatch(authAction.handleLogin(res.data));
      setLoading(false);
      toast.success(t(res.message));
      navigate('/');
    } catch (error) {
      setError(true);
      setLoading(false);
      toast.error(t(error.response.data.Message));
      setMsg(t(error.response.data.Message));
      window.scrollTo(0, 0);
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
      <div id="login">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">{t('common_uniqlo')}</Link>
                </li>
                <li className="slash">/</li>
                <li>{t('auth_login')}</li>
              </ul>
            </div>
            <div className="login-container">
              <div className="login-content">
                <div className="title">
                  <h2>{t('auth_login')}</h2>
                  <div className="required">{t('common_required')}*</div>
                </div>
                <div className="text">
                  {error ? <p className="error">{msg}</p> : <p>{t('auth_login_desc')}</p>}

                  <div className="text-info">
                    <InfoOutlined />
                  </div>
                </div>
                <form>
                  <label className="email-label">{t('auth_email_address')}</label>
                  <div className="input-email">
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder={t('auth_email_placehoder')}
                      value={email}
                      className={error ? 'error-input' : ''}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setError(false)}
                    />
                  </div>
                  <label className="pass-label">{t('auth_password')}</label>
                  <div className="input-pass">
                    <input
                      required
                      placeholder={t('auth_password')}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      className={error ? 'error-input' : ''}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setError(false)}
                    />
                  </div>
                  <p className="pass-text">{t('auth_password_desc')}</p>
                  <label className="show-pass">
                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <span className="checkmark"></span>
                    {t('auth_show_password')}
                  </label>
                  <span className="term">{t('common_terms_of_use')}</span>
                  <span className="privacy">{t('common_privacy_policy')}</span>
                  <button className="login-submit" type="submit" onClick={handleLogin}>
                    {t('auth_login')}
                  </button>
                  <span className="forgot">{t('auth_forgot_password')}</span>
                </form>
              </div>
              <div className="create-account">
                <h2 className="title">{t('auth_create_account')}</h2>
                <div className="text">
                  <p>{t('auth_create_account_desc')}</p>
                </div>
                <Link to="/register">
                  <button className="btn-create-acc">{t('auth_create_account')}</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-login">
            <p>{t('footer_copyright')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
