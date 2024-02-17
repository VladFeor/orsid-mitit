import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../loading';

const LoginModal = (props) => {
    const [orcidID, setOrcidID] = useState('0000-0001-7535-5023')
    const [password, setPassword] = useState('12')
    const [isLoading, setIsLoading] = useState(false)

    const [isTrueOrcid, setIsTrueOrcid] = useState(true)

    const handlerChangeAccountUser = (orcidAPI, role) => {
        props.handlerChangeAccountUser(orcidAPI, role)
    }
    const changeOrcidHandler = (e) => {
        setOrcidID(e.target.value)
        setIsTrueOrcid(true)
    }
    const verificationAccount = async () => {
        if (password == '' || orcidID == '') return
        setIsLoading(true)

        const teacher = {
            orcid: orcidID,
            password: password
        }
        const instance = axios.create({
            baseURL: `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
            // baseURL: 'https://localhost:3300',
        });
        instance.post('/autorizateAccount', teacher)
            .then((response) => {
                handlerChangeAccountUser(response.data.orcid, response.data.role)
            })
            .catch(() => {
                setIsTrueOrcid(false)
                setIsLoading(false)
            });
    }

    return (
        <>
            {isLoading ?
                <Loading />
                :
                <>
                    <div className="input-container">
                        <label htmlFor="orcidID" className="input-label">
                            Orcid ID:
                        </label>
                        <input
                            type="text"
                            id="orcidID"
                            value={orcidID}
                            onChange={changeOrcidHandler}
                            className={"custom-input " + (!isTrueOrcid && 'error__value')}
                        />
                        <div className={isTrueOrcid ? 'error__input' : 'error__input open'}>Не правильний orcid або пароль</div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="input-label">
                            Пароль:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input"
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit" className="submit-button"
                            onClick={verificationAccount}
                        >
                            Увійти
                        </button>
                    </div>
                </>
            }
        </>

    );
};

export default LoginModal;