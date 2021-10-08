import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor : '#FFFAF0',
      padding : '100px'
    },
  };

const ModalSessionExp = ({counterSession, setCounterSession}) => {
    const [modalIsOpen] = useState(true);
    const [displaySessionExp, setDisplaySessionExp] = useState(false);

    useEffect(() => {
  
        const interval = setTimeout(() => {
          counterSession > 0 && setCounterSession(counterSession - 1);
        }, 1000);
  
        counterSession === 0 && setDisplaySessionExp(true);
  
        return () => {
          clearInterval(interval)
        }
              
    },[counterSession, setCounterSession])
    
    return (
        <>
        { displaySessionExp && (
            <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
            >
                <div className='modal_session_expire' >
                        <h1>Votre session a expiré !</h1>
                        <button onClick={() => window.location.reload() } >Recharger</button>
                </div>
            </Modal>

        )}
        </>
       
    );
};

export default ModalSessionExp;