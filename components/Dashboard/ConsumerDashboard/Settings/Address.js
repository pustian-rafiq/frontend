import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  IconButton,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import { useQuery } from "@apollo/client";
import { GET_CONTINENTS, GET_COUNTRY_BY_CONTINENT, GET_DISTRICT_CITY, GET_DIVISION_STATE, GET_MUNICIPALITIES, GET_POLICE_STATION, GET_POST_OFFICES, GET_ROAD_OR_STREET, GET_SUB_DISTRICT, GET_UNIONS, GET_VILLAGES, GET_WORD_N0 } from "../../../../apolloClient/queries/address/ContinentQuery";
import AddDivision from "./AddDivision";
import AddDistrict from "./AddDistrict";
import AddPoliceStation from "./AddPoliceStation";
import AddSubDistrict from "./AddSubDistrict";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddRoadStreet from "./AddRoadStreet";
import AddPostOffice from "./AddPostOffice";
import AddMunicipality from "./AddMunicipality";
import AddUnion from "./AddUnion";
import AddWordNo from "./AddWordno";
import AddVillage from "./AddVillage";
import { GET_PROFILE_DETAILS } from "../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails";
import useUpdateAddress from "../../../../apolloClient/mutation/Settings/UpdateAddressSection";
import { useRouter } from "next/router";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const addIcon = {
  marginTop: "5px",
  marginLeft: "5px",
  cursor: "pointer",
  background: "#1565C0",
  height: "30px",
  width: "30px",
  color: "#fff",
  borderRadius: "50%",
  fontSize: {
    xs: "10px",
    sm: "14px",
    md: "14px",
    lg: "25px",
  },
};

const innerAddIcon = {
  marginTop: "20px",
  marginLeft: "10px",
  cursor: "pointer",
  background: "#1565C0",
  height: "25px",
  width: "25px",
  color: "#fff",
  borderRadius: "50%",
  fontSize: {
    xs: "10px",
    sm: "14px",
    md: "14px",
    lg: "25px",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

 

function Address({ ConsumerDetails, consumerLoading, countries, token }) {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const [isAddedDivision, setIsAddedDivision] = useState(false);
  const [isAddedDistrict, setIsAddedDistrict] = useState(false);
  const [isAddedSubDistrict, setIsAddedSubdistrict] = useState(false);
  const [isAddedPoliceStation, setIsAddedPoliceStation] = useState(false);
  const [isAddedRoadStreet, setIsAddedRoadStreet] = useState(false);
  const [isAddedPostOffice, setIsAddedPostOffice] = useState(false);
  const [isAddedMunicipality, setIsAddedMunicipality] = useState(false);
  const [isAddedUnion, setIsAddedUnion] = useState(false);
  const [isAddedWordNo, setIsAddedWordNo] = useState(false);
  const [isAddedVillage, setIsAddedVillage] = useState(false);

  const [isSelectContinent, setIsSelectContinent] = useState(false);
  const [isSelectCountry, setIsSelectCountry] = useState(false);
  const [isSelectDivision, setIsSelectDivision] = useState(false);
  const [isSelectDistrict, setIsSelectDistrict] = useState(false);
  const [isSelectPoliceStation, setIsSelectPoliceStation] = useState(false);
  const [isSelectSubDistrict, setIsSelectSubDistrict] = useState(false);
  const [isSelectRoadStreet, setIsSelectRoadStreet] = useState(false);
  const [isSelectPostOffice, setIsSellectPostOffice] = useState(false);
  const [isSelectMunicipality, setIsSelectMunicipality] = useState(false);
  const [isSelectUnion, setIsSelectUnion] = useState(false);
  const [isSelectWordNo, setIsSelectWordNo] = useState(false);
  const [isSelectVillage, setIsSelectVillage] = useState(false);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [countryId, setCountryId] = useState("");
  const [continentId, setContinentId] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [policeStationId, setPoliceStationId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [roadStreetId, setRoadStreetId] = useState("");
  const [postOfficeId, setPostOfficeId] = useState("");
  const [municipalityId, setMunicipalityId] = useState("");
  const [unionId, setUnionId] = useState("");
  const [wordNoId, setWordNoId] = useState("");
  const [villageId, setVillageId] = useState("");

  // Modal
  const [openDivisionModal, setOpenDivisionModal] = useState(false);
  const [openDistrictModal, setOpenDistrictModal] = useState(false);
  const [openPoliceStationModal, setOpenPoliceStationModal] = useState(false);
  const [openSubDistrictModal, setOpenSubDistrictModal] = useState(false);
  const [openRoadStreetModal, setOpenRoadStreetModal] = useState(false);
  const [openPostOfficeModal, setOpenPostOfficeModal] = useState(false);
  const [openMunicipalityModal, setOpenMunicipalityModal] = useState(false);
  const [openUnioModal, setOpenUnionModal] = useState(false);
  const [openWordNoModal, setOpenWordNoModal] = useState(false);
  const [openVillageModal, setOpenVillageModal] = useState(false);

  //Address mutation handler
  const {
    addressMutationHandler,
    loading: addressLoading,
    error: addressError,
  } = useUpdateAddress();

  // Fetch continents data
  const { loading: continentLoading, data: continentData } = useQuery(GET_CONTINENTS);

  // Fetch countries data by continent
  const { loading: countryLoading, data: countryData } = useQuery(
    GET_COUNTRY_BY_CONTINENT,
    { variables: { id: continentId } }
  );

  // Fetch division or state by country
  const { loading: divisionLoading, data: divisionData } = useQuery(
    GET_DIVISION_STATE,
    {
      variables: { id: countryId },
      fetchPolicy: 'cache-and-network',
    }
  );
  // Fetch district or city by division/state
  const { loading: districtLoading, data: districtData } = useQuery(
    GET_DISTRICT_CITY,
    {
      variables: { id: divisionId },
      fetchPolicy: 'cache-and-network',
    }
  );
  // Fetch police station by district
  const { loading: policStationLoading, data: policStationData } = useQuery(
    GET_POLICE_STATION,
    {
      variables: { id: districtId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Fetch sub district by police station
  const { loading: subDistrictLoading, data: subDistrictData } = useQuery(
    GET_SUB_DISTRICT,
    {
      variables: { id: districtId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Fetch road or street by sub district
  const { loading: roadStreetLoading, data: roadStreetData } = useQuery(
    GET_ROAD_OR_STREET,
    {
      variables: { id: policeStationId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Fetch rpost offices by police station
  const { loading: postOfficeLoading, data: postOfficeData } = useQuery(
    GET_POST_OFFICES,
    {
      variables: { id: policeStationId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Fetch municipality by sub district
  const { loading: municaplityLoading, data: municaplityData } = useQuery(
    GET_MUNICIPALITIES,
    {
      variables: { id: districtId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Fetch unions by police station
  const { loading: unionLoading, data: unionData } = useQuery(GET_UNIONS, {
    variables: { id: policeStationId },
    fetchPolicy: 'cache-and-network',
  });

  // Fetch word no by union
  const { loading: wordnoLoading, data: wordnoData } = useQuery(GET_WORD_N0, {
    variables: { id: unionId },
    fetchPolicy: 'cache-and-network',
  });

  // Fetch villages by word no
  const { loading: villageLoading, data: villageData } = useQuery(
    GET_VILLAGES,
    {
      variables: { id: wordNoId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // useEffect(()=> {
  //   setDistrictId(
  //     ConsumerDetails?.me?.consumers?.consumeraddresses?.districtOrCity?.id
  //   )
  //   setPoliceStationId(ConsumerDetails?.me?.consumers?.consumeraddresses?.policeStation?.id)
  //   setRoadStreetId(ConsumerDetails?.me?.consumers?.consumeraddresses?.roadOrStreetNo?.id)
  //   setVillageId(ConsumerDetails?.me?.consumers?.consumeraddresses?.village?.id)
  //   setWordNoId(ConsumerDetails?.me?.consumers?.consumeraddresses?.wordNo?.id)
  //   setPostOfficeId(ConsumerDetails?.me?.consumers?.consumeraddresses?.postOffice?.id)
  //   setUnionId(ConsumerDetails?.me?.consumers?.consumeraddresses?.union?.id)
  //   setMunicipalityId(ConsumerDetails?.me?.consumers?.consumeraddresses?.municipality?.id)
  // },[ConsumerDetails])
  //Fetch current latitude and longitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    setContinentId(ConsumerDetails?.me?.consumers?.consumeraddresses?.continent?.id)
    setCountryId(ConsumerDetails?.me?.consumers?.consumeraddresses?.country?.id)
    setDivisionId(ConsumerDetails?.me?.consumers?.consumeraddresses?.divisionOrState?.id)
    setPoliceStationId(ConsumerDetails?.me?.consumers?.consumeraddresses?.policeStation?.id)
    setRoadStreetId(ConsumerDetails?.me?.consumers?.consumeraddresses?.roadOrStreetNo?.id)
    setPostOfficeId(ConsumerDetails?.me?.consumers?.consumeraddresses?.postoffice?.id)
    setSubDistrictId(ConsumerDetails?.me?.consumers?.consumeraddresses?.subDistrict?.id)
    setUnionId(ConsumerDetails?.me?.consumers?.consumeraddresses?.union?.id)
    setWordNoId(ConsumerDetails?.me?.consumers?.consumeraddresses?.wordNo?.id)
    setDistrictId(ConsumerDetails?.me?.consumers?.consumeraddresses?.districtOrCity?.id)
    setMunicipalityId(ConsumerDetails?.me?.consumers?.consumeraddresses?.municipality?.id)
    setVillageId(ConsumerDetails?.me?.consumers?.consumeraddresses?.village?.id)
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  /**
   * Control continent default value and selected value
   * When new sub district added, it is shown 
   * useEffect is used for controlling latest added data
   * getSubdistrict() is used to handle multiple value in the select tag
   */
  const continentChangeHandler = (event) => {
    setIsSelectContinent(true)
    setContinentId(event.target.value);
  }
  const getContinents = () => {
    if (isSelectContinent) {
      //setIsSelectDivision(false)
      return continentId
    }

    const continent = continentData?.continents?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.continent?.id
    })
    return continent?.node?.id
  }

  /**
   * Control country default value and selected value
   * When new sub district added, it is shown 
   * useEffect is used for controlling latest added data
   * getSubdistrict() is used to handle multiple value in the select tag
   */
  const countryChangeHandler = (event) => {
    setIsSelectCountry(true)
    setCountryId(event.target.value);
  }
  const getCountries = () => {
    if (isSelectCountry) {
      //setIsSelectDivision(false)
      return countryId
    }

    const country = countryData?.continent?.countries?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.country?.id
    })
    return country?.node?.id
  }

  /**
   * Control division default value, added value and selected value
   * When new sub district added, it is shown 
   * useEffect is used for controlling latest added data
   * getSubdistrict() is used to handle multiple value in the select tag
   */

  const divisionChangeHandler = (event) => {
    setIsSelectDivision(true)
    setDivisionId(event.target.value);
  }
  const divLen = divisionData ? (divisionData?.country?.divisionOrStates?.edges)?.length : 0
  useEffect(() => {
    if (isAddedDivision) {
      const lastDivision = divisionData && divisionData?.country?.divisionOrStates?.edges[0]?.node?.id
      setDivisionId(lastDivision);

    }
    // console.log(lastSubDistrict)
  }, [divLen])

  const getDivisionState = () => {
    if (isAddedDivision) {
      //setIsAddedDivision(false)
      return divisionId
    } else if (isSelectDivision) {
      // setIsSelectDivision(false)
      return divisionId
    }

    const division = divisionData?.country?.divisionOrStates?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.divisionOrState?.id
    })
    return division?.node?.id
  }

  /**
   * Control district default value, added value and selected value
   * When new sub district added, it is shown 
   * useEffect is used for controlling latest added data
   * getSubdistrict() is used to handle multiple value in the select tag
   */

  const districtChangeHandler = (event) => {
    setIsSelectDistrict(true)
    setDistrictId(event.target.value);
  }
  const disLen = districtData && (districtData?.divisionOrState?.districtOrCities?.edges)?.length
  useEffect(() => {
    if (isAddedDistrict) {
      const lastDistrict = districtData && districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
      setDistrictId(lastDistrict);
    }
  }, [disLen])

  const getDistrict = () => {
    if (isAddedDistrict) {
      //setIsAddedDistrict(false)
      return districtId
    } else if (isSelectDistrict) {
      //setIsSelectDistrict(false)
      return districtId
    }
    // if (isSelectDivision) {
    //   return districtData?.divisionOrState?.districtOrCities?.edges[0]?.node?.id
    // }
    const defaultDistrict = districtData?.divisionOrState?.districtOrCities?.edges.find((city) => {
      return city.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.districtOrCity?.id
    })
    return defaultDistrict?.node?.id
  }
  /**
   * Control sub-district default value, added value and selected value
   * When new sub district added, it is shown 
   * useEffect is used for controlling latest added data
   * getSubdistrict() is used to handle multiple value in the select tag
   */

  const subDistrictChangeHandler = (event) => {
    setIsSelectSubDistrict(true)
    setSubDistrictId(event.target.value);
  }
  const subDistrictLen = subDistrictData ? (subDistrictData?.districtOrCity?.subDisticts?.edges)?.length : 0
  useEffect(() => {
    if (isAddedSubDistrict) {
      const lastSubDistrict = subDistrictData && subDistrictData?.districtOrCity?.subDisticts?.edges[0]?.node?.id
      setSubDistrictId(lastSubDistrict);
    }
  }, [subDistrictLen])

  const getSubdistrict = () => {
    if (isAddedSubDistrict) {
      return subDistrictId
    } else if (isSelectSubDistrict) {
      //setIsSelectSubDistrict(false)
      return subDistrictId
    }
    // if (isSelectDistrict) {
    //   return subDistrictData?.districtOrCity?.subDisticts?.edges[0]?.node?.id
    // }
    const subDis = subDistrictData?.districtOrCity?.subDisticts?.edges.find((city) => {
      return city.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.subDistrict?.id
    })
    return subDis?.node?.id
  }



  /**
   * Control police station default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const policeStationChangeHandler = (event) => {
    setIsSelectPoliceStation(true)
    setPoliceStationId(event.target.value);
  }
  const policeStationLen = policStationData && (policStationData?.districtOrCity?.policeStations?.edges)?.length
  useEffect(() => {
    if (isAddedPoliceStation) {
      const lastPoliceStation = policStationData && policStationData?.districtOrCity?.policeStations?.edges[0]?.node?.id
      setPoliceStationId(lastPoliceStation);
    }
  }, [policeStationLen])

  const getPoliceStation = () => {
    if (isAddedPoliceStation) {
      //setIsAddedSubdistrict(false)
      return policeStationId

    } else if (isSelectPoliceStation) {
      // setIsSelectPoliceStation(false)
      return policeStationId
    }

    // if (isSelectDistrict) {
    //   return policStationData?.districtOrCity?.policeStations?.edges[0]?.node?.id
    // }
    const policeStation = policStationData?.districtOrCity?.policeStations?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.policeStation?.id
    })
    return policeStation?.node?.id
  }

  /**
   * Control road or street default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const roadChangeHandler = (event) => {
    setIsSelectRoadStreet(true)
    setRoadStreetId(event.target.value);
  }
  const roadLen = roadStreetData && (roadStreetData?.policeStation?.roads?.edges)?.length
  useEffect(() => {
    if (isAddedRoadStreet) {
      const lastRoadStreet = roadStreetData && roadStreetData?.policeStation?.roads?.edges[0]?.node?.id
      setRoadStreetId(lastRoadStreet);
    }
  }, [roadLen])

  const getRoadStreet = () => {
    if (isAddedRoadStreet) {
      //setIsAddedSubdistrict(false)
      return roadStreetId

    } else if (isSelectRoadStreet) {
      // setIsSelectPoliceStation(false)
      return roadStreetId
    }

    // if (isSelectPoliceStation) {
    //   return roadStreetData?.policeStation?.roads?.edges[0]?.node?.id
    // }
    const roadStreet = roadStreetData?.policeStation?.roads?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.roadOrStreetNo?.id
    })
    return roadStreet?.node?.id
  }

  /**
   * Control post office default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const postOfficeChangeHandler = (event) => {
    setIsSellectPostOffice(true)
    setPostOfficeId(event.target.value);
  }

  const postOfficeLen = postOfficeData && (postOfficeData?.policeStation?.postoffices?.edges)?.length
  useEffect(() => {
    if (isAddedPostOffice) {
      const lastPostOffice = postOfficeData && postOfficeData?.policeStation?.postoffices?.edges[0]?.node?.id
      setPostOfficeId(lastPostOffice);
    }
  }, [postOfficeLen])

  const getPostOffices = () => {
    if (isAddedPostOffice) {
      //setIsAddedSubdistrict(false)
      return postOfficeId

    } else if (isSelectPostOffice) {
      // setIsSelectPoliceStation(false)
      return postOfficeId
    }

    // if (isSelectPoliceStation) {
    //   return postOfficeData?.policeStation?.postoffices?.edges[0]?.node?.id
    // }
    const postOffice = postOfficeData?.policeStation?.postoffices?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.postoffice?.id
    })
    return postOffice?.node?.id
  }

  /**
   * Control municipality default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const municipalityChangeHandler = (event) => {
    setIsSelectMunicipality(true)
    setMunicipalityId(event.target.value);
  }

  const municipalityLen = municaplityData && (municaplityData?.districtOrCity?.municipalities?.edges)?.length
  useEffect(() => {
    if (isAddedMunicipality) {
      const lastMunicipality = municaplityData && municaplityData?.districtOrCity?.municipalities?.edges[0]?.node?.id
      setMunicipalityId(lastMunicipality);
    }
  }, [municipalityLen])

  const getMunicipalities = () => {
    if (isAddedMunicipality) {
      //setIsAddedSubdistrict(false)
      return municipalityId

    } else if (isSelectMunicipality) {
      // setIsSelectPoliceStation(false)
      return municipalityId
    }

    // if (isSelectDistrict) {
    //   return municaplityData?.districtOrCity?.municipalities?.edges[0]?.node?.id
    // }
    const municipalityData = municaplityData?.districtOrCity?.municipalities?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.municipality?.id
    })
    return municipalityData?.node?.id
  }


  /**
   * Control Union default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const unionChangeHandler = (event) => {
    setIsSelectUnion(true)
    setUnionId(event.target.value);
  }

  const unionLen = unionData && (unionData?.policeStation?.unions?.edges)?.length
  useEffect(() => {
    if (isAddedUnion) {
      const lastUnion = unionData && unionData?.policeStation?.unions?.edges[0]?.node?.id
      setUnionId(lastUnion);
    }
  }, [unionLen])

  const getUnions = () => {
    if (isAddedUnion) {
      //setIsAddedSubdistrict(false)
      return unionId

    } else if (isSelectUnion) {
      // setIsSelectPoliceStation(false)
      return unionId
    }

    // if (isSelectPoliceStation) {
    //   return unionData?.policeStation?.unions?.edges[0]?.node?.id
    // }
    const union = unionData?.policeStation?.unions?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.union?.id
    })
    return union?.node?.id
  }


  /**
   * Control wordno default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const wordnoChangeHandler = (event) => {
    setIsSelectWordNo(true)
    setWordNoId(event.target.value);
  }

  const wordnoLen = wordnoData && (wordnoData?.union?.wordnos?.edges)?.length
  useEffect(() => {
    if (isAddedWordNo) {
      const lastWordNo = wordnoData && wordnoData?.union?.wordnos?.edges[0]?.node?.id
      setWordNoId(lastWordNo);
    }
  }, [wordnoLen])

  const getWordnos = () => {
    if (isAddedWordNo) {
      //setIsAddedSubdistrict(false)
      return wordNoId

    } else if (isSelectWordNo) {
      // setIsSelectPoliceStation(false)
      return wordNoId
    }

    // if (isSelectUnion) {
    //   return wordnoData?.union?.wordnos?.edges[0]?.node?.id
    // }
    const wordNo = wordnoData?.union?.wordnos?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.wordNo?.id
    })
    return wordNo?.node?.id
  }

  /**
   * Control village default value, added value and selected value
   * When new police station added, it is shown automatically
   * useEffect is used for controlling latest added data
   * getPoliceStation() is used to handle multiple value in the select tag
   */
  const villageChangeHandler = (event) => {
    setIsSelectVillage(true)
    setVillageId(event.target.value);
  }

  const villageLen = villageData && (villageData?.wordNo?.villages?.edges)?.length
  useEffect(() => {
    if (isAddedVillage) {
      const lastVillage = villageData?.wordNo?.villages?.edges[0]?.node?.id
      setVillageId(lastVillage);
    }
  }, [villageLen])

  const getVillages = () => {
    if (isAddedVillage) {
      //setIsAddedSubdistrict(false)
      return villageId

    } else if (isSelectVillage) {
      // setIsSelectPoliceStation(false)
      return villageId
    }

    // if (isSelectWordNo) {
    //   return villageData?.wordNo?.villages?.edges[0]?.node?.id
    // }
    const village = villageData?.wordNo?.villages?.edges.find((data) => {
      return data.node.id === ConsumerDetails?.me?.consumers?.consumeraddresses?.village?.id
    })
    return village?.node?.id
  }


  if (continentLoading) {
    return <div>Loading.....</div>
  }
  // if (continentLoading || countryLoading || divisionLoading || districtLoading || policStationLoading || subDistrictLoading || roadStreetLoading || postOfficeLoading || municaplityLoading || unionLoading || wordnoLoading || villageLoading) {
  //   return <div>Loading.....</div>
  // }
  const districtHandler = (value) => {
    setIsAddedDistrict(value)
  }
  const divisionHandler = (value) => {
    setIsAddedDivision(value)
  }
  const subDistrictHandler = (value) => {
    setIsAddedSubdistrict(value)
  }
  const policeStationHandler = (value) => {
    setIsAddedPoliceStation(value)
  }
  const roadStreetHandler = (value) => {
    setIsAddedRoadStreet(value)
  }
  const postOfficeHandler = (value) => {
    setIsAddedPostOffice(value)
  }
  const municipalityHandler = (value) => {
    setIsAddedMunicipality(value)
  }
  const unionHandler = (value) => {
    setIsAddedUnion(value)
  }
  const wordnoHandler = (value) => {
    setIsAddedWordNo(value)
  }
  const villageHandler = (value) => {
    setIsAddedVillage(value)
  }
  const onError = (errors, e) => {
    console.log(errors, e)
  };
  // Update Address form handler
  const addressSubmitHandler = (data) => {
    console.log("data", data);
   
    addressMutationHandler({
      variables: {
        id: ConsumerDetails?.me?.consumers?.id,
        latitude: latitude,
        longitude: longitude,
        currentLatitude: latitude,
        currentLongitude: longitude,
        continentId: continentId,
        countryId: countryId,
        divisionOrStateId: divisionId,
        districtOrCityId: districtId,
        policeStationId: policeStationId,
        subDistrictId: subDistrictId,
        roadOrStreetNoId: roadStreetId,
        postofficeId: postOfficeId,
        municipalityId: municipalityId,
        unionId: unionId,
        wordNoId: wordNoId,
        villageId: villageId,
        mahalla: data.mahalla,
        block: data.block,
        holdingNo: data.holding_no,
        house: data.house,
      },
      refetchQueries: [{ query: GET_PROFILE_DETAILS }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        // console.log("on completed");
        // router.push("/admin-dashboard/inventory/category")
        setOpen(true);
        setTimeout(() => {
          router.push("/consumer-dashboard/profile")
          setOpen(false);
        }, 3000);
      },
      onError: (err) => {
        console.log("err", err)
        setTimeout(() => {
          setIsError(true);
        }, 5000);
        setIsError(false)
      },
    });

    if (!addressLoading && !addressError) {
      console.log("DOne")
      //router.push("/admin-dashboard/inventory/category");
    } else {
      //alert(vatUpdateError);
    }
  };


  return (
    <>

      <Grid container spacing={1}>
        {/* Left side section */}
        <Grid item md={3}></Grid>
        <form onSubmit={handleSubmit(addressSubmitHandler, onError)}>
          <Box
            sx={{ width: "100%" }}
            style={open ? { display: "block" } : { display: "none" }}
          >
            <Alert
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => {
                  setOpen(false);
                }}>
                  <CloseIcon
                    fontSize="inherit"
                  />
                </IconButton>
              }
              sx={{ mb: 2 }}
              variant="filled"
              severity="success"
            >
              Address updated Successfully!
            </Alert>
          </Box>

          <Box
            sx={{ width: "100%" }}
            style={isError ? { display: "block" } : { display: "none" }}
          >
            <Alert
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => {
                  setIsError(false);
                }}>
                  <CloseIcon
                    fontSize="inherit"
                  />
                </IconButton>
              }
              sx={{ mb: 2 }}
              variant="filled"
              severity="warning"
            >
              Address not updated!
            </Alert>
          </Box>
          <Grid item md={12}>
            <Grid container rowSpacing={3}>
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Continent</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getContinents() ? getContinents() : ""}
                    {...register("continent")}
                    label="Select Continent"
                    onChange={continentChangeHandler}
                  >
                    {
                      !continentLoading && continentData && continentData?.continents?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* Country */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Country</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    name="countryId"
                    required
                    value={getCountries() ? getCountries() : ""}
                    {...register("countryId")}
                    label="Select Country"
                    onChange={countryChangeHandler}
                  >
                    {
                      !countryLoading && countryData && countryData?.continent?.countries?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>

                <Typography sx={{ color: "#E75C33" }}>
                  {isSelectContinent && errors.country &&
                    errors.country.type === "required" &&
                    "You must be selected a country"}
                </Typography>
              </Grid>

              {/* Division or state */}

              <Grid item xs={10} md={10}>

                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Division/State</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    name="divisionId"
                    required
                    value={getDivisionState() ? getDivisionState() : ""}
                    {...register("divisionId")}
                    label="Select Division/State"
                    onChange={divisionChangeHandler}
                  >
                    {
                      !divisionLoading && divisionData && divisionData?.country?.divisionOrStates?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <Typography sx={{ color: "#E75C33" }}>
                  {isSelectCountry && errors.division &&
                    errors.division.type === "required" &&
                    "You must be selected a division"}
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Division">
                  <Add sx={addIcon} onClick={() => setOpenDivisionModal(true)} />
                </Tooltip>
              </Grid>

              {/* District or city */}

              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select District</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    value={getDistrict() ? getDistrict() : ""}
                    {...register("district")}
                    label="Select District"
                    onChange={districtChangeHandler}
                  >
                    {
                      !districtLoading && districtData && districtData?.divisionOrState?.districtOrCities
                        ?.edges.map((data, index) => {
                          return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                        })
                    }
                  </Select>
                </FormControl>
                <Typography sx={{ color: "#E75C33" }}>
                  {isSelectDivision && errors.district &&
                    errors.district.type === "required" &&
                    "You must be selected a district"}
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add District">
                  <Add sx={addIcon} onClick={() => setOpenDistrictModal(true)} />
                </Tooltip>

              </Grid>

              {/* Police Station */}

              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Police Station</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    value={getPoliceStation() ? getPoliceStation() : ""}
                    {...register("police_station")}
                    label="Select Sub District"
                    onChange={policeStationChangeHandler}
                  >
                    {
                      !policStationLoading && policStationData && policStationData?.districtOrCity?.policeStations?.edges.map((station, index) => {
                        return <MenuItem key={index} value={station.node.id}>{station.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <Typography sx={{ color: "#E75C33" }}>
                  {isSelectDistrict && errors.police_station &&
                    errors.police_station.type === "required" &&
                    "You must be selected a police Station"}
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Police Station">
                  <Add sx={addIcon} onClick={() => setOpenPoliceStationModal(true)} />
                </Tooltip>
              </Grid>

              {/* Sub district */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Sub District</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    value={getSubdistrict() ? getSubdistrict() : ""}
                    {...register("district")}
                    label="Select Sub District"
                    onChange={subDistrictChangeHandler}
                  >
                    {
                      !subDistrictLoading && subDistrictData && subDistrictData?.districtOrCity?.subDisticts?.edges.map((subdistrict, index) => {
                        return <MenuItem key={index} value={subdistrict.node.id}>{subdistrict.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>

              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Sub-District">
                  <Add sx={addIcon} onClick={() => setOpenSubDistrictModal(true)} />
                </Tooltip>
              </Grid>

              {/* Road or street */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Road/Street</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getRoadStreet() ? getRoadStreet() : ""}
                    {...register("road_street")}
                    label="Select Road/Street"
                    onChange={roadChangeHandler}
                  >
                    {
                      !roadStreetLoading && roadStreetData && roadStreetData?.policeStation?.roads?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Road/Street">
                  <Add sx={addIcon} onClick={() => setOpenRoadStreetModal(true)} />
                </Tooltip>
              </Grid>

              {/* Post office */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Post Office</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getPostOffices() ? getPostOffices() : ""}
                    {...register("post_office")}
                    label="Select Post Office"
                    onChange={postOfficeChangeHandler}
                  >
                    {
                      !postOfficeLoading && postOfficeData && postOfficeData?.policeStation?.postoffices?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Post Office">
                  <Add sx={addIcon} onClick={() => setOpenPostOfficeModal(true)} />
                </Tooltip>
              </Grid>

              {/* Municipality */}

              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Municipality</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getMunicipalities() ? getMunicipalities() : ""}
                    {...register("municipality")}
                    label="Select Municipality"
                    onChange={municipalityChangeHandler}
                  >
                    {
                      !municaplityLoading && municaplityData && municaplityData?.districtOrCity?.municipalities?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
               
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Municipality">
                  <Add sx={addIcon} onClick={() => setOpenMunicipalityModal(true)} />
                </Tooltip>
              </Grid>

              {/* Union */}

              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Union</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getUnions() ? getUnions() : ""}
                    {...register("union")}
                    label="Select Union"
                    onChange={unionChangeHandler}
                  >
                    {
                      !unionLoading && unionData && unionData?.policeStation?.unions?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Union">
                  <Add sx={addIcon} onClick={() => setOpenUnionModal(true)} />
                </Tooltip>
              </Grid>
              {/* Word no */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Wordno</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    required
                    value={getWordnos() ? getWordnos() : ""}
                    name="wordno"
                    {...register("wordno",)}
                    label="Select Wordno"
                    onChange={wordnoChangeHandler}
                  >
                    {
                      !wordnoLoading && wordnoData && wordnoData?.union?.wordnos?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.number}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Wordno">
                  <Add sx={addIcon} onClick={() => setOpenWordNoModal(true)} />
                </Tooltip>
              </Grid>
              {/* Village */}
              <Grid item xs={10} md={10}>
                <FormControl sx={{ minWidth: 500 }} size="small">
                  <InputLabel id="demo-select-small">Select Village</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-large"
                    name="village"
                    required
                    value={getVillages() ? getVillages() : ""}
                    {...register("village")}
                    label="Select Village"
                    onChange={villageChangeHandler}
                  >
                    {
                      !villageLoading && villageData && villageData?.wordNo?.villages?.edges.map((data, index) => {
                        return <MenuItem key={index} value={data.node.id}>{data.node.name}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <Typography sx={{ color: "#E75C33" }}>
                  {isSelectWordNo && !isAddedVillage && errors.village &&
                    errors.village.type === "required" &&
                    "You must have a village name"}
                </Typography>
              </Grid>
              <Grid item xs={2} md={2}>
                <Tooltip title="Add Village">
                  <Add sx={addIcon} onClick={() => setOpenVillageModal(true)} />
                </Tooltip>
              </Grid>
              {/* Mahalla */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Mahalla"
                  defaultValue={ConsumerDetails && ConsumerDetails?.me?.consumers?.consumeraddresses?.mahalla}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="mahalla"
                  {...register("mahalla")}
                />
              </Grid>

              {/* Block */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Block"
                  defaultValue={ConsumerDetails && ConsumerDetails?.me?.consumers?.consumeraddresses?.block}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="block"
                  {...register("block")}
                />
              </Grid>

              {/* Holding No */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Holding No"
                  defaultValue={ConsumerDetails && ConsumerDetails?.me?.consumers?.consumeraddresses?.holdingNo}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="holdingNo"
                  {...register("holding_no")}
                />
              </Grid>

              {/* House */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="House"
                  defaultValue={ConsumerDetails && ConsumerDetails?.me?.consumers?.consumeraddresses?.house}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="house"
                  {...register("house")}
                />
              </Grid>
              {/* Consumer CIN */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Consumer CIN"
                  inputProps={{ readOnly: true }}
                  defaultValue={ConsumerDetails && ConsumerDetails?.me?.consumers?.username}
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="cin"
                  {...register("cin")}
                />
              </Grid>
              {/* Latitude */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Latitude"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="latitude"
                  value={latitude}
                  inputProps={{ readOnly: true }}
                  {...register("latitude")}
                />
              </Grid>
              {/*Current Latitude */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Current Latitude"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="current_latitude"
                  value={latitude}
                  inputProps={{ readOnly: true }}
                  {...register("current_latitude")}
                />
              </Grid>
              {/* Longitude */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Longitude"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="longitude"
                  value={longitude}
                  inputProps={{ readOnly: true }}
                  {...register("longitude")}
                />
              </Grid>
              {/* Current Longitude */}
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  size="small"
                  id="fullWidth"
                  label="Current Longitude"
                  InputLabelProps={{ style: { fontSize: 15 } }}
                  name="current_longitude"
                  value={longitude}
                  inputProps={{ readOnly: true }}
                  {...register("current_longitude")}
                />
              </Grid>

              {/* District or city */}
              {/* <Grid item xs={10} md={10}>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                //defaultValue={countries.edges[18]}
                name="country"
                onChange={(event, value) => setCountry(value?.node?.id)}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    label="Consumer Cin"
                    placeholder="Select consumer cin"
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} md={2}>
              <Add sx={addIcon} />
            </Grid> */}

              <Grid item md={4}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "15px",
                    width: "100%",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>

      {/* Continent Modal*/}


      <AddDivision
        open={openDivisionModal}
        handleClose={() => setOpenDivisionModal(false)}
        countries={countryData}
        isAddedDivision={divisionHandler}
      />
      <AddDistrict
        open={openDistrictModal}
        handleClose={() => setOpenDistrictModal(false)}
        countries={countryData}
        divisionStates={divisionData}
        isAddedDistrict={districtHandler}
      />
      <AddPoliceStation
        open={openPoliceStationModal}
        handleClose={() => setOpenPoliceStationModal(false)}
        districtData={districtData}
        divisionStates={divisionData}
        isAddedPoliceStation={policeStationHandler}
      />
      <AddSubDistrict
        open={openSubDistrictModal}
        handleClose={() => setOpenSubDistrictModal(false)}
        districtData={districtData}
        divisionStates={divisionData}
        isAddedSubDistrict={subDistrictHandler}
      />
      <AddRoadStreet
        open={openRoadStreetModal}
        handleClose={() => setOpenRoadStreetModal(false)}
        districtData={districtData}
        policStationData={policStationData}
        isAddedRoadStreet={roadStreetHandler}
      />
      <AddPostOffice
        open={openPostOfficeModal}
        handleClose={() => setOpenPostOfficeModal(false)}
        districtData={districtData}
        policStationData={policStationData}
        divisionStates={divisionData}
        isAddedPostOffice={postOfficeHandler}
      />
      <AddMunicipality
        open={openMunicipalityModal}
        handleClose={() => setOpenMunicipalityModal(false)}
        districtData={districtData}
        divisionStates={divisionData}
        isAddedMunicipality={municipalityHandler}
      />
      <AddUnion
        open={openUnioModal}
        handleClose={() => setOpenUnionModal(false)}
        policStationData={policStationData}
        districtData={districtData}
        divisionStates={divisionData}
        isAddedUnion={unionHandler}
      />
      <AddWordNo
        open={openWordNoModal}
        handleClose={() => setOpenWordNoModal(false)}
        unionData={unionData}
        municaplityData={municaplityData}
        districtData={districtData}
        isAddedWordNo={wordnoHandler}
      />
      <AddVillage
        open={openVillageModal}
        handleClose={() => setOpenVillageModal(false)}
        unionData={unionData}
        wordnoData={wordnoData}
        municaplityData={municaplityData}
        districtData={districtData}
        isAddedVillage={villageHandler}
      />
    </>
  );
}
export default Address
