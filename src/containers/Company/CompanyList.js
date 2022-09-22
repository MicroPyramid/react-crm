import React, { useEffect, useState } from "react";
import {
  Link,
  List,
  ListItem,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { CompanyUrl } from "../../components/ApiUrls";
import { fetchData } from "../../components/FetchData";
import "../../css/companies.css";
import { useNavigate } from "react-router";

export const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "jwt " + window.localStorage.getItem("Token"),
  };
  let navigate = useNavigate();
  useEffect(() => {
    fetchData(`${CompanyUrl}/`, "GET", null, headers)
      .then((data) => {
        if (data.detail) {
          alert(data.detail);
          localStorage.clear();
          navigate("/login");
        }
        if (!data.error) {
          setCompanies(data.companies);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="companies">
      <Container>
        <Typography variant="h5">Companies</Typography>
        <List className="list">
          {companies.length > 0 &&
            companies.map((item) => (
              <ListItem>
                <Link
                  className="link"
                  href="/"
                  variant="body2"
                  underline="none"
                  onClick={() => localStorage.setItem("company", item.id)}
                >
                  {item.name}
                </Link>
              </ListItem>
            ))}
        </List>
      </Container>
    </div>
  );
};
