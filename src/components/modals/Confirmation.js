import React from 'react';

const Confirmation = (props) => {

    return (
        <>
            <div className='main__title__modal'>{props.textConfirm}</div>
            <div className='modal__two__btn'>
                <button
                    className="modal__btn--less submit-button"
                    onClick={() => props.confirmExit(true)}
                >
                    Так
                </button>
                <button
                    className="modal__btn--less submit-button"
                    onClick={() => props.confirmExit(false)}
                >
                    Ні
                </button>
            </div>
        </>

    );
};

export default Confirmation;