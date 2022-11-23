import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
   GoogleAuth:{
			scopes:["profile","email"],
			serverClientId:"884656862179-q4319djimt7ji26hs3lbs8n5j8gqccp2.apps.googleusercontent.com",
			forceCodeForRefreshToken:true
		},
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};  

export default config;