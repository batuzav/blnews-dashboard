export const getAllCampaignsQuery = () => `
query{
    getAllampaigns{
      _id,
      title,
      subtitle,
      description,
      country,
      img,
      timezone,
      startDate,
      endDate,
      allUsers,
      status,
      category,
      imageBody, 
      createdBy,
      counting,
      user {
        dibNumber
        _id,
        firstName,
        lastName,
      }      
    }
  }`;


export const AddCapaignMutation = (data) => `mutation{
  createCampaign(campaignInput:{
    title:"${data.title}", 
    subtitle:"${data.subtitle}",
    description: "${data.description}"
    country: [${data.refactoredCountries}],
    img: "${data.usedImg}",
    timezone: "esto es una timezone",
    startDate: "${data.startDateString}",
    endDate:"${data.endDateString}",
    allUsers: false,
    status:1,
    category: [${data.refactoredCategories}],
    imageBody:"${data.usedimageBody}",
    createdBy:"${data.user._id}",

  }) {
    _id,
    title,
    subtitle,
    description,
    country,
    img,
    timezone,
    startDate,
    endDate,
    allUsers,
    status,
    category,
    imageBody,
    counting,
    user {
      dibNumber
      _id,
      firstName,
      lastName,
    }
  }
    
}`;


export const updateCampaignMutation = (data) => `mutation{
  updateCampaign(campaignInput:{
  title:"${data.title}", 
  subtitle:"${data.subtitle}",
  description: "${data.description}"
  country: [${data.refactoredCountries}],
  img: "${data.usedImg}",
  timezone: "esto es una timezone",
  startDate: "${data.startDateString}",
  endDate:"${data.endDateString}",
  allUsers: false,
  status:1,
  category: [${data.refactoredCategories}],
  imageBody:"${data.usedimageBody}",
  createdBy:"${data.user._id}",

}, id:"${data._id}" ) {
  _id,
  title,
  subtitle,
  description,
  country,
  img,
  timezone,
  startDate,
  endDate,
  allUsers,
  status,
  category,
  imageBody,
  counting,
  user {
    dibNumber
    _id,
    firstName,
    lastName,
  }
}
  
}`;
