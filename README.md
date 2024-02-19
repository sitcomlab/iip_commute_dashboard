# Intelligentes-Pendeln Dashboard Osnabrück-Münster

This is the dashboard of the IIP project. It aims to provide information regarding intermodal commuting in the cities of Münster and Osnabrück, with a focus on bicycle traffic. It is based on the climate-dashboard Münster [Klimadashboard Münster](https://gitlab.opencode.de/smart-city-muenster/klimadashboard-muenster), and the [smart-city dashboard Münster](https://github.com/lorenzomorning/smart-city-dashboard/tree/main).

The dashboard currently sources data off of OpenStreetMap, but later aims to incorporate live data from the [IIP-platform](https://www.intelligent-pendeln.de/) and [OpenSenseMap](https://opensensemap.org/). 

## Getting Started

To run the Klimadashboard application on your local machine, first clone the repository:

> > > git clone https://github.com/sitcomlab/iip_commute_dashboard.git
> > > cd iip_commute_dashboard

Then, install the dependencies:

> > > npm install
> > >
> > > # or
> > >
> > > yarn install

Finally, start the development server:

> > > npm run dev
> > >
> > > # or
> > >
> > > yarn dev

You should now be able to access the application at `http://localhost:3000`.

## Contributing

Thank you for considering contributing to this project! We appreciate your help in making it better.

### Development Workflow

1. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
2. Make your changes and ensure they adhere to the project's coding style.
3. Commit your changes using [Semantic Commit Messages](https://semantic-release.gitbook.io/semantic-release/#commit-message-format) to ensure clear and consistent commit history.
4. Push your branch to your forked repository: `git push origin feature/your-feature-name`.
5. Submit a pull request to the main repository's `main` branch, including a clear description of your changes
