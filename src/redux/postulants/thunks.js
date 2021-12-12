import {
  getPostulantsFetching,
  getPostulantsFulfilled,
  getPostulantsRejected,
  getOnePostulantFetching,
  getOnePostulantFulfilled,
  getOnePostulantRejected,
  addPostulantFetching,
  addPostulantFulfilled,
  addPostulantRejected,
  updatePostulantFetching,
  updatePostulantFulfilled,
  updatePostulantRejected,
  deletePostulantFetching,
  deletePostulantFulfilled,
  deletePostulantRejected
} from './actions';

const URL = process.env.REACT_APP_API;

export const getPostulants = () => (dispatch) => {
  dispatch(getPostulantsFetching());
  fetch(`${URL}/postulants/`)
    .then((data) => data.json())
    .then((response) => dispatch(getPostulantsFulfilled(response)))
    .catch((error) => dispatch(getPostulantsRejected(error)));
};

export const getOnePostulant = (id) => (dispatch) => {
  dispatch(getOnePostulantFetching());
  return fetch(`${URL}/postulants/${id}`)
    .then((response) => {
      if (response.status != 200) throw response.message;
      return response.json();
    })
    .then((response) => {
      dispatch(getOnePostulantFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(getOnePostulantRejected(error));
      return error;
    });
};

export const addPostulant = (data) => (dispatch) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      city: data.city,
      state: data.state,
      country: data.country,
      elementarySchool: [
        {
          name: data.elementarySchoolName,
          degree: data.elementarySchoolDegree,
          graduateYear: data.elementarySchoolGraduateYear
        }
      ],
      highSchool: [
        {
          name: data.highSchoolName,
          degree: data.highSchoolDegree,
          graduateYear: data.highSchoolGraduateYear
        }
      ],
      juniorCollege: [
        {
          name: data.juniorCollegeName,
          degree: data.juniorCollegeDegree,
          graduateYear: data.juniorCollegeGraduateYear
        }
      ],
      university: [
        {
          name: data.universityName,
          degree: data.universityDegree,
          graduateYear: data.universityGraduateYear
        }
      ],
      openToWork: data.openToWork,
      workExperience: [
        {
          title: data.workExperienceTitle,
          start: data.workExperienceStart,
          end: data.workExperienceEnd,
          company: data.workExperienceCompany,
          description: data.workExperienceDescription
        }
      ],
      professionalTraining: [
        {
          description: data.profTrainingDescription,
          year: data.profTrainingYear
        }
      ],
      languages: data.languages,
      hobbies: data.hobbies,
      familyMembers: [
        {
          name: data.familyMember1Name,
          bond: data.familyMember1bond
        },
        {
          name: data.familyMember2Name,
          bond: data.familyMember2bond
        },
        {
          name: data.familyMember3Name,
          bond: data.familyMember3bond
        },
        {
          name: data.familyMember4Name,
          bond: data.familyMember4bond
        }
      ],
      availability: [
        {
          monday: 'Monday',
          available: data.availabilityCheckMonday,
          from: data.availabilityFromMonday,
          to: data.availabilityToMonday
        },
        {
          Tuesday: 'Tuesday',
          available: data.availabilityCheckTuesday,
          from: data.availabilityFromTuesday,
          to: data.availabilityToTuesday
        },
        {
          Wednesday: 'Wednesday',
          available: data.availabilityCheckWednesday,
          from: data.availabilityFromWednesday,
          to: data.availabilityToWednesday
        },
        {
          Thursday: 'Thursday',
          available: data.availabilityCheckThursday,
          from: data.availabilityFromThursday,
          to: data.availabilityToThursday
        },
        {
          Friday: 'Friday',
          available: data.availabilityCheckFriday,
          from: data.availabilityFromFriday,
          to: data.availabilityToFriday
        },
        {
          Saturday: 'Saturday',
          available: data.availabilityCheckSaturday,
          from: data.availabilityFromSaturday,
          to: data.availabilityToSaturday
        },
        {
          Sunday: 'Sunday',
          available: data.availabilityCheckSunday,
          from: data.availabilityFromSunday,
          to: data.availabilityToSunday
        }
      ]
    })
  };

  dispatch(addPostulantFetching());

  return fetch(`${URL}/postulants/add`, options)
    .then((data) => {
      if (data.status !== 201) {
        return data.json().then(({ message }) => {
          throw message;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addPostulantFulfilled(response));
      return response;
    })
    .catch((error) => {
      dispatch(addPostulantRejected(error));
      return error;
    });
};

export const updatePostulant = (id, data) => (dispatch) => {
  dispatch(updatePostulantFetching());
  return fetch(`${URL}/postulants/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      city: data.city,
      state: data.state,
      country: data.country,
      elementarySchool: [
        {
          name: data.elementarySchoolName,
          degree: data.elementarySchoolDegree,
          graduateYear: data.elementarySchoolGraduateYear
        }
      ],
      highSchool: [
        {
          name: data.highSchoolName,
          degree: data.highSchoolDegree,
          graduateYear: data.highSchoolGraduateYear
        }
      ],
      juniorCollege: [
        {
          name: data.juniorCollegeName,
          degree: data.juniorCollegeDegree,
          graduateYear: data.juniorCollegeGraduateYear
        }
      ],
      university: [
        {
          name: data.universityName,
          degree: data.universityDegree,
          graduateYear: data.universityGraduateYear
        }
      ],
      openToWork: data.openToWork,
      workExperience: [
        {
          title: data.workExperienceTitle,
          start: data.workExperienceStart,
          end: data.workExperienceEnd,
          company: data.workExperienceCompany,
          description: data.workExperienceDescription
        }
      ],
      professionalTraining: [
        {
          description: data.profTrainingDescription,
          year: data.profTrainingYear
        }
      ],
      languages: data.languages,
      hobbies: data.hobbies,
      familyMembers: [
        {
          name: data.familyMember1Name,
          bond: data.familyMember1bond
        },
        {
          name: data.familyMember2Name,
          bond: data.familyMember2bond
        },
        {
          name: data.familyMember3Name,
          bond: data.familyMember3bond
        },
        {
          name: data.familyMember4Name,
          bond: data.familyMember4bond
        }
      ],
      availability: [
        {
          monday: 'Monday',
          available: data.availabilityCheckMonday,
          from: data.availabilityFromMonday,
          to: data.availabilityToMonday
        },
        {
          Tuesday: 'Tuesday',
          available: data.availabilityCheckTuesday,
          from: data.availabilityFromTuesday,
          to: data.availabilityToTuesday
        },
        {
          Wednesday: 'Wednesday',
          available: data.availabilityCheckWednesday,
          from: data.availabilityFromWednesday,
          to: data.availabilityToWednesday
        },
        {
          Thursday: 'Thursday',
          available: data.availabilityCheckThursday,
          from: data.availabilityFromThursday,
          to: data.availabilityToThursday
        },
        {
          Friday: 'Friday',
          available: data.availabilityCheckFriday,
          from: data.availabilityFromFriday,
          to: data.availabilityToFriday
        },
        {
          Saturday: 'Saturday',
          available: data.availabilityCheckSaturday,
          from: data.availabilityFromSaturday,
          to: data.availabilityToSaturday
        },
        {
          Sunday: 'Sunday',
          available: data.availabilityCheckSunday,
          from: data.availabilityFromSunday,
          to: data.availabilityToSunday
        }
      ]
    })
  })
    .then((data) => {
      if (data.status != 200) throw data.statusText;
      return data.json();
    })
    .then((response) => {
      dispatch(updatePostulantFulfilled(response));
      return response;
    })
    .catch((error) => dispatch(updatePostulantRejected(error)));
};

export const deletePostulant = (id) => (dispatch) => {
  dispatch(deletePostulantFetching());
  return fetch(`${URL}/postulants/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status != 200) throw response;
      dispatch(deletePostulantFulfilled(id));
    })
    .catch((error) => dispatch(deletePostulantRejected(error.statusText)));
};
