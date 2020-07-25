import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  TextField,
  Button
} from '@material-ui/core';

import { BASE_URI } from 'api/constants';
import { useUser } from 'contexts/user';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  let { setOrders: _setOrders, isAdmin } = useUser();

  const [orders, setOrders] = useState(null);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [email, setEmail] = useState('');

  const fetchData = async () => {
    let { token } = JSON.parse(localStorage.getItem('user'));
    let { data } = await axios.get(`${BASE_URI}/getSales`, {
      headers: {
        auth: token
      }
    });
    setOrders(data);
    _setOrders(data);
  };

  const fetchSalesByEmail = async () => {
    let { token } = JSON.parse(localStorage.getItem('user'));
    let { data } = await axios.get(
      `${BASE_URI}/getSalesPerson?email=${email}`,
      {
        headers: {
          auth: token
        }
      }
    );
    setOrders(data);
    _setOrders(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const addEntry = async () => {
    try {
      let formData = new FormData();
      let { token } = JSON.parse(localStorage.getItem('user'));
      let { customer, email, product } = formState.values;
      formData.append('customer', customer);
      formData.append('product', product);
      formData.append('email', email);
      console.log(token);
      let { data } = new axios({
        method: 'POST',
        url: `${BASE_URI}/newEntry`,
        data: formData,
        headers: {
          auth: token
        }
      });
      fetchData();
    } catch (e) {
      console.log('Add entry failed');
      console.log(e);
    }
  };

  const _delete = async (id) => {
    try {
      let { token } = JSON.parse(localStorage.getItem('user'));

      let { data } = await axios.get(`${BASE_URI}/deleteSale?id=${id}`, {
        headers: {
          auth: token
        }
      });
      fetchData();
    } catch (e) {
      console.log(e);
      console.log('Delete failed');
    }
  };

  if (!orders) return null;
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {isAdmin && (
        <>
          <Card>
            <CardContent>
              <TextField
                style={{
                  width: '30%',
                  marginBottom: 10,
                  marginRight: '1rem'
                }}
                label="Email"
                name="email"
                onChange={(email) => setEmail(email.target.value)}
                type="text"
                value={email}
                variant="outlined"
              />
              <Button
                color="primary"
                size="large"
                type="submit"
                fullWidth
                onClick={fetchSalesByEmail}
                variant="contained">
                SEARCH
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <TextField
                style={{
                  width: '30%',
                  marginBottom: 10,
                  marginRight: '1rem'
                }}
                label="User"
                name="email"
                onChange={handleChange}
                type="text"
                value={formState.values.email || ''}
                variant="outlined"
              />
              <TextField
                style={{
                  width: '30%',
                  marginBottom: 10,
                  marginRight: '1rem'
                }}
                fullWidth
                label="Customer"
                name="customer"
                onChange={handleChange}
                type="text"
                value={formState.values.customer || ''}
                variant="outlined"
              />
              <TextField
                style={{
                  width: '30%'
                }}
                fullWidth
                label="Product"
                name="product"
                onChange={handleChange}
                type="text"
                value={formState.values.product || ''}
                variant="outlined"
              />
              <Button
                color="primary"
                size="large"
                type="submit"
                fullWidth
                onClick={addEntry}
                variant="contained">
                ADD
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      <CardHeader title="Latest Orders" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Ref</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow hover key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Button
                          color="secondary"
                          size="large"
                          type="submit"
                          fullWidth
                          onClick={() => _delete(order._id)}
                          variant="contained">
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
