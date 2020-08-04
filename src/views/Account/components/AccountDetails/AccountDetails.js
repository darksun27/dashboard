import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { BASE_URI } from 'api/constants';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));




const AccountDetails = props => {
  let { token, email } = JSON.parse(localStorage.getItem('user'));
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});


  const fetchData = async()=> {
    try {
      let { data } = await axios.get(
        `${BASE_URI}/getBankDetails?email=${email}`,
        {
          headers: {
            auth: token
          }
        }
      );
      console.log("data",data[0]);
      setValues(data[0]);
    }
    catch(e) {
      console.log('Error fetching bank details')
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    console.log(values)
    formData.append('email', email);
    formData.append('accountName', values.accountName);
    formData.append('accountNumber', values.accountNumber);
    formData.append('bankName', values.bankName);
    formData.append('bankBranch', values.bankBranch);
    formData.append('ifsc', values.ifsc);
    console.log(formData)
    try {
      console.log(token)
      let {data} = await new axios({
        method: 'POST',
        url: `${BASE_URI}/saveBankDetails`,
        headers: { 'auth': token, 'Content-Type': 'multipart/form-data' },
        data: formData
      })
    }
    catch (e) {
      console.log('error saving details');  
    }
    fetchData();
    console.log(values);
  };

  const handleChange = async event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

  };
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleClick}
      >
        <CardHeader
          subheader="The information can be edited"
          title="Bank Details"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the account holder's name"
                label="Name of Account Holder"
                margin="dense"
                name="accountName"
                onChange={handleChange}
                required
                value={values.accountName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Bank's name"
                label="Bank Name"
                margin="dense"
                name="bankName"
                onChange={handleChange}
                required
                value={values.bankName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the account number"
                label="Account Number"
                margin="normal"
                name="accountNumber"
                onChange={handleChange}
                required
                value={values.accountNumber || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the bank's branch name"
                label="Bank Branch"
                margin="dense"
                name="bankBranch"
                onChange={handleChange}
                required
                value={values.bankBranch || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the bank's IFSC Code"
                label="IFSC Code"
                margin="dense"
                name="ifsc"
                onChange={handleChange}
                required
                value={values.ifsc || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
