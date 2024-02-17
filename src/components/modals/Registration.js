import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../loading';

const RegistrationModal = (props) => {
    const [orcidID, setOrcidID] = useState('0000-0001-7535-5023')
    const [password, setPassword] = useState('12')
    const [confirmedPassword, setConfirmedPassword] = useState('12')
    const [errorMessage, setErrorMessage] = useState('Невірний OrcidID')
    const [isLoading, setIsLoading] = useState(false)

    const [isTrueOrcid, setIsTrueOrcid] = useState(true)

    const changeOrcidHandler = (e) => {
        setOrcidID(e.target.value)
        setIsTrueOrcid(true)
    }
    const checkOrsidID = async () => {
        if (password != confirmedPassword || password == '' || orcidID == '') return
        setIsLoading(true)

        let orcidPattern = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/

        if (!orcidPattern.test(orcidID)) {
            setErrorMessage('Невірно вказаний orcid')
            setIsTrueOrcid(false)
            setIsLoading(false)
            return null
        }
        const teacher = {
            orcid: orcidID,
            password: password
        }
        const instance = axios.create({
            baseURL: `https://${process.env.HOST}:${process.env.SERVER_PORT}`,

            // baseURL: 'https://localhost:3300',
        });
        instance.post('/createNewAccount', teacher)
            .then((response) => {
                return props.handlerChangeAccountUser(response.data.orcid, response.data.role)
            })
            .catch(() => {
                setErrorMessage('Користувач з даним orcid вже зареєстрованний')
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
                        <div className={isTrueOrcid ? 'error__input' : 'error__input open'}>{errorMessage}</div>
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
                    <div className="input-container">
                        <label htmlFor="confirmedPassword" className="input-label">
                            Підтвердження пароля:
                        </label>
                        <input
                            type="password"
                            id="input1"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}

                            className={"custom-input " + (password !== confirmedPassword && 'error__value')}
                        />
                        <div className={password == confirmedPassword ? 'error__input' : 'error__input open'}>Паролі не співпадають</div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="submit" className="submit-button"
                            onClick={checkOrsidID}
                        >
                            Зареєструвати
                        </button>
                    </div>
                </>
            }



        </>

    );
};

export default RegistrationModal;