import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import axios from 'axios';
import { BASE_URI } from 'api/constants';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from 'contexts/auth';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const Sale = (props) => {
  const { history } = props;

  const classes = useStyles();
  const { signIn, errorText, hasErrorLogin } = useAuth();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const confirmSale = async ()=>{
    let formData = new FormData();
    formData.append('email', props.match.params.user);
    formData.append('customer', formState.values.email);
    formData.append('product', props.match.params.course);
    try {
      let {data} = await new axios({
        method: 'POST',
        url: `${BASE_URI}/confirmSale`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }) 
      if(data){
        alert('Done')
      }
    }
    catch(e) {
      alert(e)
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    let { email, password } = formState.values;
    let response = await signIn({ email, password });
    if (response) history.push('/');
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div
              className={classes.contentBody}
              style={{
                margin: 'auto'
              }}>
              <form className={classes.form}>
                <Typography className={classes.title} variant="h2">
                  Confirm Order
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  label="Customer Email Address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Referral"
                  name="Referral"
                  disabled
                  value={props.match.params.user || ''}
                  variant="outlined"
                />
                <Typography className={classes.title} variant="h2">
                  Course Selected: {props.match.params.course || 'Course Selected'}
                </Typography>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={confirmSale}  
                >
                  Confirm
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Sale.propTypes = {
  history: PropTypes.object
};

export default withRouter(Sale);
