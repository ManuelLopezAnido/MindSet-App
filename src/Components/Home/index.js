import JobOffers from 'Components/Postulant/JobOffers';

const homePage = () => {
  return (
    <section>
      <div>
        <h1>
          Welcome to <span>MindSet!</span>
        </h1>
        <h2>The most trending web for recruiting.</h2>
      </div>
      <JobOffers />
    </section>
  );
};

export default homePage;
