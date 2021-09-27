import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import localization from 'moment/locale/fr';
import Modal from 'react-modal';
import { ImCross } from 'react-icons/im';
import { BiPrinter } from 'react-icons/bi';



import "react-big-calendar/lib/css/react-big-calendar.css";
import { isEmpty } from '../Utils';
import Form from './Form';
import Delete from './Delete';

import '../index.scss';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor : '#FFFF00',
    },
  };

  const Calendrier = () => {
    
    const eventCalendar = useSelector(state => state.usersReducer);
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [startEvent, setStartEvent] = useState();
    const [endEvent, setEndEvent] = useState();
    const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
    const [detailView, setDetailView] = useState();
    const [user, setUser] = useState(0);
    const [planning, setPlanning] = useState();
    const [load, setLoad] = useState(false);
    const [loadCalendarEdit, setLoadCalendarEdit] = useState(false);
    const [fullCalendar, setFullCalendar] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [displayInputUser, setDisplayInputUser] = useState(false);
    const [errorCreateUser, setErrorCreateUser] = useState('');


    useEffect(() => {
      eventCalendar[user] && setPlanning(eventCalendar[user])
            
    },[eventCalendar, user])
        
    const openModal = () => {
      setIsOpenDetails(false)
      setIsOpen(true);
    }
    const modalDetails = () => {
      setIsOpen(false);
        setIsOpenDetails(true);
      }
    const modalCloseDetails = () => {
        setIsOpenDetails(false);
        eraseValues();
      }
    
    const closeModal = () => {
      setIsOpen(false);
      eraseValues();
      setLoadCalendarEdit(false);
    }

    moment.locale('fr', localization)

    const minTime = new Date();
    const maxTime = new Date(); 

    minTime.setHours(8,0);
    maxTime.setHours(19,0);

    
    const handleSelect = e => {
      setStartEvent(e.start);
      setEndEvent(e.end);
      openModal();
    }

    const titleAcces = (e) =>
    <div className='title_calendar' >
      <div>
        <h4>{e.name}</h4>
        <div>
          {e.car && <img src='car.png' alt='car' />}       
          {e.ct && <img src='ct.png' alt='ct' />}       
        </div>
      </div>
      <p>{e.repar}</p>
      <p>{e.model} </p>
    </div>   
    
    const titleAccesFullCalendar = e => {
        const repar = e.repar
        const reparSubstr = repar.substr(0,60).toLowerCase();
        const name = e.name.toUpperCase();

      return(
        <div className='title_fullcalendar'>
          <div>
            <p>{name}</p> 
            <div>
              {e.car && <img src='car.png' alt='car' />}   
              {e.ct && <img src='ct.png' alt='ct' />}
            </div>
          </div>
          <p>{reparSubstr}{ repar.length > 60 && '...'}</p>
        </div>
      ) 
    }


    const handleModal = (e) => {
      modalDetails();
      setDetailView(e);
    }
    
    const eraseValues = () => {
        setStartEvent('');
        setEndEvent('');
        setDetailView('');
    }

    const calendarStyle = (e) => {

      const arrayAllday = [];
      planning.planning.filter(e => e.name === 'test').forEach(element => arrayAllday.push(element));

      // console.log(new Date(arrayAllday[0].start));

      // while(new Date(arrayAllday[0].start).getDate() === e.getDate()-1){
      //   return {
      //     style: {
      //       backgroundColor: '#949191', //this works
      //     }
      //   }
      // }

      const publicHoliday = [
        '1/0', '5/3', '1/4', '8/4', '13/4', '24/4', '14/6', '15/7', '1/10', '11/10', '25/11' 
      ]

      for(let i = 0 ; i < publicHoliday.length ; i++){
        if(publicHoliday[i] === (e.getDate()+'/'+ e.getMonth())){
          return {
            style: {
              backgroundColor: '#949191', //this works
            }
          }
        }
      }

        if(e.getDay() === 0 || e.getDay() === 6) {
          return {
            style: {
              backgroundColor: '#949191', //this works
            }
          }
        }

    }  

    const breakChangeColor = hours => {
        const startBreak = 1200;
        let endBreak = "";

        if(planning.pseudo === "Philippe"){
          endBreak = 1400
        }else endBreak = 1330;

        const h = hours.getHours();
        const m = hours.getMinutes() === 0 ?  "00" : hours.getMinutes()
        const horaires = h + '' + m ;
        if(horaires >= startBreak && endBreak > horaires )
        return {
            style: {
              backgroundColor: '#505050', //this works
            }
          }
    }       

    const mapToRBCFormat = e => Object.assign({}, e, {
      start: new Date(e.start),
      end: new Date(e.end)
    });

    const deleteHourEvent =  {
      eventTimeRangeFormat: () => { 
          return "";
        },
    }

    const changeUser = key => {
      setUser(key)
      setFullCalendar(false)
      if(load) {
        eventCalendar[user] = planning
        setLoad(false)
      }
    }

    const handleChange = () => {
      openModal();
      setLoadCalendarEdit(true);
    }

    const removeUser = (id) => {
      if(window.confirm('Voulez-vous supprimer cet utilisateur ?')){
        axios({
          method: 'delete',
          url:`${process.env.REACT_APP_API_URL}api/${id}`,
          'Access-Control-Allow-Credentials': true,
        })
        .then(res => {
          if(res.data.message) {
            window.location.reload();
          };
        })
        .catch(err => {
          console.log(err);
        })
    }}

    const handleCreateUser = e => {
      e.preventDefault()
      if(pseudo.length >= 3 ){
        axios({
          method: 'post',
          url:`${process.env.REACT_APP_API_URL}api`,
          'Access-Control-Allow-Credentials': true,
          data: {pseudo}
        })
        .then(res => {
          if(res.data.user) {
            window.location.reload();
          };
        })
        .catch(err => {
          console.log(err);
        })
      }else{
        setErrorCreateUser('Minimum 3 lettres')
      }
    }


    const colorHeaderDate = (props) => {
      const arrayCt = [];
      planning.planning.filter(e => e.ct === true).forEach(element => arrayCt.push(new Date(element.start)));
      let car = '';
      let ct = '';
      const arrayCar = [];
      planning.planning.filter(e => e.car === true).forEach(element => arrayCar.push(new Date(element.start)));
      
      if(!isEmpty(arrayCt)){
        for(let i = 0 ; i < arrayCt.length; i++){
          if(arrayCt[i].getDate() + '/' + arrayCt[0].getMonth() === props.date.getDate() + '/' + arrayCt[0].getMonth()){
            ct = '_ct'
          }
        };
      }
      
      if(!isEmpty(arrayCar)){
        for(let i = 0 ; i < arrayCar.length; i++){
          if(arrayCar[i].getDate() + '/' + arrayCar[0].getMonth() === props.date.getDate() + '/' + arrayCar[0].getMonth()){
            car= '_car'
          }
        };
      }
      let style = `header_color${ct + car}`;


      return(
        <div className={style}  >
          {props.label}
        </div>
      )
    }
    
    return (
      <div>
        {displayInputUser && (
                          
          <div className='form_create_user' >
            <form action='' onSubmit={handleCreateUser} >
                <label htmlFor='name'>Pseudo</label>
                <input type='text' name='name' id='name' onChange={e => setPseudo(e.target.value)} value={pseudo} />
                <input type='submit' value='Envoyer'/>
                <button onClick={() => setDisplayInputUser(false)}>Annuler</button>
                <p style={{color : 'red'}} >{errorCreateUser}</p>
            </form> 
          </div>
        )}
        <div>
          {
            isEmpty(eventCalendar) && <button onClick={() => setDisplayInputUser(true)} >+</button>
          }
        </div>
          {
            isEmpty(planning) ? (
              <p>Loading...</p>
              )
              :
              (                
                <div>
                  <div className='headerCalendar' >
                    <div>
                      {
                        !fullCalendar && (
                          eventCalendar.map((user, key) =>
                          <>
                            <button data-tip='' data-for='deleteUser' className={planning.pseudo === user.pseudo && 'activeButton'} onClick={() => changeUser(key)} >{user.pseudo}</button> 
                            {planning.pseudo === user.pseudo && (
                              <ImCross className='crossDelete'  onClick={() => removeUser(user._id)} size='0.5em'/>
                              )}
                          </>
                          )
                          )
                        }
                        {!fullCalendar && <button onClick={() => setDisplayInputUser(!displayInputUser)} >+</button>}
                        
                    </div>
                      <button onClick={ () => setFullCalendar(!fullCalendar)}>{!fullCalendar ? 'Complet' : 'Individuel'}</button>
                      <div className='legend_print'>
                        <div style={{ backgroundColor : 'orange'}}>CT</div>
                        <BiPrinter className='btn_print'  onClick={() => window.print() } size='2em' />
                        <div style={{ backgroundColor : 'yellow'}}>CAR</div>
                      </div>
                  </div>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    
                    >
                    <h2>Prise de rendez-vous</h2>
                    <Form 
                      id={planning._id} 
                      closeModal={closeModal} 
                      setPlanning={setPlanning}
                      setLoad={setLoad}
                      detail={detailView}
                      planning={planning}
                      startEvent={startEvent}
                      endEvent={endEvent}
                      min={minTime}
                      max={maxTime}
                      setLoadCalendarEdit={setLoadCalendarEdit}
                      loadCalendarEdit={loadCalendarEdit}
                      />
                    <button onClick={closeModal}>Fermer</button>
                  </Modal>
                  <Modal
                    isOpen={modalIsOpenDetails}
                    onRequestClose={modalCloseDetails}
                    style={customStyles}
                  >
                  { !isEmpty(detailView) && (
                    <div>
                          <h2>{detailView.name}</h2>
                          <p>{detailView.start.getHours()}h
                          { detailView.start.getMinutes() === 0 ?  "" : detailView.start.getMinutes()  } -
                          {detailView.end.getHours()}h
                          { detailView.end.getMinutes() === 0 ?  "" : detailView.end.getMinutes()  }
                          </p>
                          <p>{detailView.model}</p>
                          <p>{detailView.repar}</p>
                          <p>{detailView.num}</p>
                          <p>{detailView.details}</p>
                          {detailView.ct && <p>Controle technique</p>}
                          {detailView.car && <p>Prêt véhicule</p>}
                          { !fullCalendar && (
                            <>
                              <Delete 
                                setPlanning={setPlanning}
                                modalCloseDetails={modalCloseDetails}
                                userId={planning._id}
                                eventId={detailView._id}
                                setLoad={setLoad}
                                
                                />
                              
                              <input type='button' onClick={() => handleChange(detailView)} value='Modifier' /> 
                            </>
                          )}
                          
                      </div>

                  )}
                  </Modal>
                  {fullCalendar ? (
                    <div className='container_fullCalendar'  >
                        { eventCalendar.map(event => 
                        <div>
                          <h4>{event.pseudo}</h4>
                          <Calendar
                            messages={{ next: 'Suivant', previous: 'Précédent', today: "Aujourd'hui", month: 'Mois', work_week:'Semaine' }}
                            views={[ 'work_week' ]}
                            defaultView={'work_week'}
                            localizer={localizer}
                            events={event.planning.map(mapToRBCFormat)}
                            onSelectSlot={ e => handleSelect(e)}
                            onSelectEvent={e => handleModal(e)}
                            timeslots={2}
                            step={60}
                            min={minTime}
                            max={maxTime}
                            titleAccessor={e => titleAccesFullCalendar(e)}
                            showMultiDayTimes
                            dayPropGetter={e => calendarStyle(e)}
                            slotPropGetter={e => breakChangeColor(e)}
                            eventPropGetter={
                              e => {
                                let newStyle = {
                                  backgroundColor: e.color,
                                };
                                
                                return {
                                  className: "",
                                  style: newStyle
                                };
                              }
                            }
                            formats={deleteHourEvent}
                            style={{ height: 350 }}
                            // components={{
                            //   work_week:{
                            //     header: colorHeaderDate,
                            //   }
                            // }}
                          />
                        </div>
                        )}
                    </div>
                  )
                  :
                  (
                    <>
                      <h4 className='pseudo_print_calendar' >{planning.pseudo}</h4>
                        <Calendar 
                          messages={{ next: 'Suivant', previous: 'Précédent', today: "Aujourd'hui", month: 'Mois', work_week:'Semaine' }}
                          selectable={'ignoreEvents'}
                          views={[ 'month', 'work_week' ]}
                          defaultView={'work_week'}
                          localizer={localizer}
                          events={planning.planning.map(mapToRBCFormat)}
                          onSelectSlot={ e => handleSelect(e)}
                          onSelectEvent={e => handleModal(e)}
                          timeslots={2}
                          min={minTime}
                          max={maxTime}
                          titleAccessor={e => titleAcces(e)}
                          showMultiDayTimes
                          dayPropGetter={e => calendarStyle(e)}
                          slotPropGetter={e => breakChangeColor(e)}
                          eventPropGetter={
                            e => {
                              let newStyle = {
                                backgroundColor: e.color,
                              };
                              
                              return {
                                className: "",
                                style: newStyle
                              };
                            }
                          }
                          formats={deleteHourEvent}
                          components={{
                            work_week:{
                              header: colorHeaderDate,
                            }
                          }}
                          />
                    </>
                  )}
            </div>
            )
          }
      </div>
    )
  }
  
  
  export default Calendrier;
