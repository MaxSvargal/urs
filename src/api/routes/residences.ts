/* tslint:disable:no-angle-bracket-type-assertion no-null-keyword max-line-length*/
import { ApiTypes, App } from '../index'

export let residences = (app: App) => app.get('/residences', async () =>
  ({
    residences: <ApiTypes.Residence[]>[
      {
        blur_url: '/media/residences/60/VI022WMZTBV152L.jpg',
        city: 'Boston',
        city_title: 'Boston',
        description: `As you enter the beautiful Beacon rowhouse flat you’re greeted by the newly renovated kitchen which is painted in a defining muted blue color. Down the entry hall is where you’ll encounter the living space showcasing a mixture of walnut woods and a caned tv stand. A small gold bistro table for two serves as a breakfast nook for a space to sit and complete your next task. Over all the space was designed to be as functional as it is aesthetically pleasing.
        ↵< br /> <br />
        ↵The first room features an upholstered full size bed with an elegant walnut wood frame.The second room in the home is the largest one with a modern queen bed.The third room in the home features a soft palette of beiges tones and walnut woods.The fourth and final room of the unit has all the features that you’ll need.`,
        id: 60,
        latitude: 42.35992,
        longitude: - 71.06457,
        min_month_price: 1375,
        picture_url: '/media/residences/60/FHEY87CKEN6J2J8.jpg',
        preview_url: null,
        residence_type: 'private_rooms',
        soldout: false,
        title: 'Beacon Hill',
        url: '/residences/boston-beacon-hill-one',
      },
    ],
  }),
)
