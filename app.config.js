export default ({ config }) => ({
  ...config,
  expo: {
    name: 'Habitize',
    slug: 'habitize-mobile',
    version: '1.0.0',
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    android : {
      intentFilters : [
        {
          action : 'VIEW',
          data : [
            {
              scheme : 'habitize',
              host : 'auth-callback',
            },
          ],
          category : ['BROWSABLE' , 'DEFAULt'],
        },
      ],
    },
    ios : {
      bundleIndentifier : 'com.Example.habitize',
      supportsTables : true,
      infoPlist : {
        CFBundleURLTypes : [
          {
            CFBundleURLSchemes : ['habitize'],
          },
        ],
      },
    },
  },
});
