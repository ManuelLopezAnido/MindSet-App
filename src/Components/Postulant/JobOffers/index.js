import styles from './JobOffers.module.css';
import listStyles from 'lists.module.css';
import locationIcon from 'assets/images/location.png';
import InputSearch from 'Components/Shared/InputSearch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
import IsLoading from 'Components/Shared/IsLoading/IsLoading';
import ModalInfo from 'Components/Shared/ModalInfo';
import VisualizeButton from 'Components/Shared/VisualizeButton';

const JobOffers = () => {
  const dispatch = useDispatch();
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const isLoading = useSelector((store) => store.positions.isLoading);
  const jobOffers = useSelector((store) => store.positions.list);
  const [inputSearchBar, setInputSearchBar] = useState('');

  useEffect(() => {
    dispatch(getPositions());
  }, []);

  if (isLoading) {
    return <IsLoading />;
  }

  const Visualize = (title, description, city, country) => {
    setShowModalInfo(true);
    setTitle(title);
    setDescription(description);
    setCity(city);
    setCountry(country);
  };

  const closeModalInfo = () => {
    setShowModalInfo(false);
  };

  return (
    <section className={listStyles.mainContainer}>
      <ModalInfo
        showModal={showModalInfo}
        closeModal={closeModalInfo}
        title1={'Job'}
        title2={'Description'}
        title3={'City'}
        title4={'Country'}
        text1={title}
        text2={description}
        text3={city}
        text4={country}
      />
      <div className={styles.inputSearch}>
        <InputSearch
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearchBar(event.target.value)}
        />
      </div>
      <div className={listStyles.containerList}>
        {jobOffers
          .filter((jobOffer) => {
            if (
              jobOffer.jobTitle?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              jobOffer.clientName?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              jobOffer.city?.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              jobOffer.clientId?.clientName.toLowerCase().includes(inputSearchBar.toLowerCase()) ||
              jobOffer.country?.toLowerCase().includes(inputSearchBar.toLowerCase())
            ) {
              return jobOffer;
            }
          })
          .map((jobs) => (
            <div className={listStyles.container} key={jobs._id}>
              <div className={listStyles.title}>
                <p className={styles.jobTitle}>{jobs.jobTitle}</p>
                <VisualizeButton
                  onClick={() =>
                    Visualize(jobs.jobTitle, jobs.jobDescription, jobs.city, jobs.country)
                  }
                />
              </div>
              <p className={styles.jobDescription}>{jobs.jobDescription}</p>
              <div className={listStyles.footerContainer}>
                <div className={listStyles.location}>
                  <p>{jobs.clientId?.clientName}</p>
                </div>
                <div className={listStyles.location}>
                  <img src={locationIcon} />
                  <p>
                    {jobs.city}, {jobs.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default JobOffers;
