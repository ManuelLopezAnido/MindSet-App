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
          name: data.elementarySchool[0].name,
          degree: data.elementarySchool[0].degree,
          graduateYear: data.elementarySchool[0].graduateYear
        }
      ],
      highSchool: [
        {
          name: data.highSchool[0].name,
          degree: data.highSchool[0].degree,
          graduateYear: data.highSchool[0].graduateYear
        }
      ],
      juniorCollege: [
        {
          name: data.juniorCollege[0].name,
          degree: data.juniorCollege[0].degree,
          graduateYear: data.juniorCollege[0].graduateYear
        }
      ],
      university: [
        {
          name: data.university[0].name,
          degree: data.university[0].degree,
          graduateYear: data.university[0].graduateYear
        }
      ],
      openToWork: data.openToWork,
      workExperience: [
        {
          title: data.workExperience[0].title,
          start: data.workExperience[0].start,
          end: data.workExperience[0].end,
          company: data.workExperience[0].company,
          description: data.workExperience[0].description
        }
      ],
      professionalTraining: [
        {
          description: data.professionalTraining[0].description,
          year: data.professionalTraining[0].year
        }
      ],
      languages: data.languages,
      hobbies: data.hobbies,
      familyMembers: [
        {
          name: data.familyMembers[0].name,
          bond: data.familyMembers[0].bond
        },
        {
          name: data.familyMembers[1].name,
          bond: data.familyMembers[1].bond
        },
        {
          name: data.familyMembers[2].name,
          bond: data.familyMembers[2].bond
        },
        {
          name: data.familyMembers[3].name,
          bond: data.familyMembers[3].bond
        }
      ],
      availability: [
        {
          monday: 'Monday',
          available: data.availability[0].available,
          from: data.availability[0].from,
          to: data.availability[0].to
        },
        {
          Tuesday: 'Tuesday',
          available: data.availability[1].available,
          from: data.availability[1].from,
          to: data.availability[1].to
        },
        {
          Wednesday: 'Wednesday',
          available: data.availability[2].available,
          from: data.availability[2].from,
          to: data.availability[2].to
        },
        {
          Thursday: 'Thursday',
          available: data.availability[3].available,
          from: data.availability[3].from,
          to: data.availability[3].to
        },
        {
          Friday: 'Friday',
          available: data.availability[4].available,
          from: data.availability[4].from,
          to: data.availability[4].to
        },
        {
          Saturday: 'Saturday',
          available: data.availability[5].available,
          from: data.availability[5].from,
          to: data.availability[5].to
        },
        {
          Sunday: 'Sunday',
          available: data.availability[6].available,
          from: data.availability[6].from,
          to: data.availability[6].to
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
          name: data.elementarySchool[0].name,
          degree: data.elementarySchool[0].degree,
          graduateYear: data.elementarySchool[0].graduateYear
        }
      ],
      highSchool: [
        {
          name: data.highSchool[0].name,
          degree: data.highSchool[0].degree,
          graduateYear: data.highSchool[0].graduateYear
        }
      ],
      juniorCollege: [
        {
          name: data.juniorCollege[0].name,
          degree: data.juniorCollege[0].degree,
          graduateYear: data.juniorCollege[0].graduateYear
        }
      ],
      university: [
        {
          name: data.university[0].name,
          degree: data.university[0].degree,
          graduateYear: data.university[0].graduateYear
        }
      ],
      openToWork: data.openToWork,
      workExperience: [
        {
          title: data.workExperience[0].title,
          start: data.workExperience[0].start,
          end: data.workExperience[0].end,
          company: data.workExperience[0].company,
          description: data.workExperience[0].description
        }
      ],
      professionalTraining: [
        {
          description: data.professionalTraining[0].description,
          year: data.professionalTraining[0].year
        }
      ],
      languages: data.languages,
      hobbies: data.hobbies,
      familyMembers: [
        {
          name: data.familyMembers[0].name,
          bond: data.familyMembers[0].bond
        },
        {
          name: data.familyMembers[1].name,
          bond: data.familyMembers[1].bond
        },
        {
          name: data.familyMembers[2].name,
          bond: data.familyMembers[2].bond
        },
        {
          name: data.familyMembers[3].name,
          bond: data.familyMembers[3].bond
        }
      ],
      availability: [
        {
          monday: 'Monday',
          available: data.availability[0].available,
          from: data.availability[0].from,
          to: data.availability[0].to
        },
        {
          Tuesday: 'Tuesday',
          available: data.availability[1].available,
          from: data.availability[1].from,
          to: data.availability[1].to
        },
        {
          Wednesday: 'Wednesday',
          available: data.availability[2].available,
          from: data.availability[2].from,
          to: data.availability[2].to
        },
        {
          Thursday: 'Thursday',
          available: data.availability[3].available,
          from: data.availability[3].from,
          to: data.availability[3].to
        },
        {
          Friday: 'Friday',
          available: data.availability[4].available,
          from: data.availability[4].from,
          to: data.availability[4].to
        },
        {
          Saturday: 'Saturday',
          available: data.availability[5].available,
          from: data.availability[5].from,
          to: data.availability[5].to
        },
        {
          Sunday: 'Sunday',
          available: data.availability[6].available,
          from: data.availability[6].from,
          to: data.availability[6].to
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
      if (response.status != 204) throw response;
      dispatch(deletePostulantFulfilled(id));
    })
    .catch((error) => dispatch(deletePostulantRejected(error.statusText)));
};
