import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import api from '../utils/api.js';
import { useState, useEffect, useContext } from 'react';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    handleRequest();
  }, []);


  function handleRequest() {
    api.getProfileInfo()
      .then((data) => {
        const resultProfileData = {
          id: data._id,
          name: data.name,
          job: data.about,
          avatar: data.avatar
        };
        setCurrentUser(resultProfileData);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }


const [isEditProfilePopupOpen, editProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, addPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopup] = useState(false);
  const [isPopupImageOpen, openPopupImage] = useState(false);
  const [isDeletePopupOpen, openPopupDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openPopupImage(true);
  };

  const closeAllPopups = () => {
    editProfilePopup(false);
    editAvatarPopup(false);
    addPlacePopup(false);
    openPopupImage(false);
    openPopupDelete(false);
  };

  const handleEditProfileClick = () => {
    editProfilePopup(true);
  };
  const handleEditAvatarClick = () => {
    editAvatarPopup(true);
  };
  const handleAddPlaceClick = () => {
    addPlacePopup(true);
  };

  const handleCardDeleteClick = (card) => {
    openPopupDelete(true);
    assignCard(card);
  }

  //const [saveButtonAvatar, setSaveButtonAvatar] = useState('Отправить');

  const [saveButtonEdit, setSaveButtonEdit] = useState('Сохранить');

  function updateSaveButEdit(text) {
    setSaveButtonEdit(text);
  }

  function handleUpdateUser(newUser) {
    api.saveProfileData(newUser.name, newUser.job)
      .then(result => {
        const resultProfileData = {
          id: result._id,
          name: result.name,
          job: result.about,
          avatar: result.avatar
        };
        setCurrentUser(resultProfileData);
      })
      .catch(err => console.log(err))
      .finally(res => {
        updateSaveButEdit('Сохранить');
        closeAllPopups();
      });

  }
    
  const [saveButtonAvatar, setSaveButtonAvatar] = useState('Отправить');

  function updateSaveButAvatar(text) {
    setSaveButtonAvatar(text);
  }

  function handleUpdateAvatar(newUser) {
    api.saveAvatarUrl(newUser.avatar)
      .then(result => {
        //console.log('saved data AVATAR' + Object.entries(result));
        const resultProfileData = {
          id: result._id,
          name: result.name,
          job: result.about,
          avatar: result.avatar
        };
        setCurrentUser(resultProfileData);
       
      })
      .catch(err => console.log(err))
      .finally(res=> {
        updateSaveButAvatar('Отправить');
        closeAllPopups();
      });

  }
  
  const [saveButtonDelete, setSaveButDelete] = useState('Да');

  function updateSaveButDelete(text) {
    setSaveButDelete(text);
  }


  function handleCardDelete(card) {
    //console.log('card to delete: ' + card);
    api.deleteCard(card._id)
    .then(res => {        //console.log('result deleted? + ' + Object.entries(card));
      
    })
    .catch(err => console.log(err))
    .finally(res=> {
      setCards((state) => state.filter( /*оставить только те что с условием */
        (c) =>   c._id !== card._id && c ));
        setSaveButDelete('Да');
        closeAllPopups();
    });

     
  }

  function handleCardLike(card) {
    
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    api.changeLikeCardStatus(card._id, isLiked).then((result) => {
      //console.log('likes card id: ' + card._id);
      setCards((state) => state.map(
        (c) => c._id === card._id ? result : c)
      );

    })
      .catch(err => console.log(err));
  } /* handleCardDelete also here */

  const [cards, setCards] = useState([]);

  useEffect(() => {
    renderCards();
  }, []);



  function renderCards() {
    api.getInitialCards()
      .then((data) => {
        const resultCards = data.map(card => {
          return {
            _id: card._id,
            likes: card.likes,
            name: card.name,
            link: card.link,
            owner: card.owner
          };
        });
        setCards(resultCards);
      })
      .catch((err) => console.log("Ошибка такова:" + err))
      .finally(() => {
      });
  }

  const [saveButtonNewPlace, setSaveButtonNewPlace] = useState('Создать');

  function updateSaveButNewPlace(text) {
    setSaveButtonNewPlace(text);
  }

  function handleAddPlaceSubmit(cardName, cardLink) {
    api.postNewCard({
      name: cardName,
      link: cardLink
    })
      .then((newCard) => {
        //console.log('newcard', Object.entries(newCard));
        setCards([newCard, ...cards]);        
      })
      .catch(err => console.log(err))
      .finally(res => {
        updateSaveButNewPlace('Создать');
        closeAllPopups();
      });
  }

const [currentCard, setCurrentCard] = useState();

function assignCard(card) {
  setCurrentCard(card);
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="App">
          <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClickMain={handleCardClick}
              onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} allCards={cards} />

            <Footer />
            <ImagePopup card={selectedCard} isOpen={isPopupImageOpen} onClose={closeAllPopups} />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onEditButText={updateSaveButEdit} saveButton={saveButtonEdit}/>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onEditButText={updateSaveButAvatar} saveButton={saveButtonAvatar}/>

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit} 
            onEditButText={updateSaveButNewPlace} saveButton={saveButtonNewPlace} />

            <DeleteCardPopup isOpen={isDeletePopupOpen}  onClose={closeAllPopups} onDeletePopup={handleCardDelete} currentCard={currentCard} onEditButText={updateSaveButDelete} saveButton={saveButtonDelete}/>
           

          </div>
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
