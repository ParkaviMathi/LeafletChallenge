# LeafletChallenge
Plotting earthquake info using leaflet
## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!
The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualise their data will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.


## Creating the Earthquake Visualisation
Our task is to visualise an earthquake dataset. The following steps have been completed:


Getting the dataset. To do so, the following steps have been taken:

The USGS provides earthquake data in a number of different formats, updated every five minutes. 
A dataset has been chosen for visualisation by visiting the USGS GeoJSON Feed page.

The data has been imported and visualised by doing the following:


Using Leaflet,a map has been created that plots all the earthquakes from the dataset based on their longitude and latitude.
The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in colour.
The depth of the earth can be found as the third coordinate for each earthquake.
Popups has been included that provide additional information about the earthquake when its associated marker is clicked.
A legend has been created that will provide context for your map data.


