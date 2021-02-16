import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';



export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("423142504937-m3fevha0di1ja6fp5vb0fp1ldl3do00p.apps.googleusercontent.com")
 }]);

  return config;
}