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
