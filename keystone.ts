// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists,
    session,
    server: {
      cors: {
        origin: false,
        credentials: false,
      },
    },
    storage: {
      image_storage: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },

      // this is the path to the directory where uploaded files will be stored
      //   if you want to store them somewhere else, you can change this value
      //   see https://keystonejs.com/docs/apis/config#storage-api
      //   for more information
      // NOTE: this path must exist before you run `keystone-next dev` or `keystone-next start`
      //   if it doesn't exist, you'll get an error
    },
  })
);
