export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const switchRefactoredCounty = (value) => {
    switch (value) {
      case "MEX":
          return {value: "MEX", label: "México"};
      case "PER": 
          return {value: "PER", label: "Perú"}
      case "BOL": 
          return {value: "BOL", label: "Bolivia"};
      case "SAL":
          return { value: "SAL", label: "El Salvador" };
      case "PAN": 
          return {value: "PAN", label: "Panamá" };
      case "USA": 
          return { value: "USA", label: "United States" };
      default:
        break;
    }
  }

export const switchRefactoredCategory = (value) => {
    switch (value) {
      case "NUT":
          return {value: "NUT", label: "Nutrición"};
      case "NOT": 
          return {value: "NOT", label: "Noticias"}
      case "PRO": 
          return {value: "PRO", label: "Promoción"};
      default:
        break;
    }
}

export const refactorCampaign = (campaigns, type, imgToUpdating = "https://i.imgur.com/YYOjj4r.png", imgBodyToUpdating = "https://i.imgur.com/YYOjj4r.png") => {
    
    //1 = get; 2 = post;
    
    if(type === 1){
      campaigns.map((campaign)=>{
        console.log('campaigns', campaigns) 
        let refactoredCountries = [];
        let refactoredCategories = [];
        campaign.country.map((value)=>{
          refactoredCountries = [...refactoredCountries, switchRefactoredCounty(value)];
        });
        campaign.category.map((value)=>{
          refactoredCategories = [...refactoredCategories, switchRefactoredCategory(value)];
        });
        campaign.startDate = new Date(campaign.startDate);
        campaign.endDate = new Date(campaign.endDate);
        campaign.usedImg = campaign.img;
        campaign.img = "";
        campaign.usedimageBody = campaign.imageBody;        ;
        campaign.imageBody = "";
        campaign.country = refactoredCountries; 
        campaign.category = refactoredCategories; 
      });
    }
    if(type === 2) {
      console.log('campaigns', campaigns)
      let refactoredCountries = [];
      let refactoredCategories = [];
     
      campaigns.country.map((country)=>{
        const temp = `"${country.value}"`;
        refactoredCountries = [...refactoredCountries, temp];
      });
      campaigns.category.map((category)=> {
        const temp = `"${category.value}"`;
        refactoredCategories = [...refactoredCategories, temp];
      });
      campaigns.refactoredCountries = refactoredCountries;
      campaigns.refactoredCategories = refactoredCategories;
      campaigns.endDateString = campaigns.endDate.toISOString();
      campaigns.startDateString = campaigns.startDate.toISOString();
      campaigns.usedImg =  imgToUpdating;
      campaigns.usedimageBody = imgBodyToUpdating;
      console.log('campaign', campaigns);
      
    }
    
    return campaigns;
  }