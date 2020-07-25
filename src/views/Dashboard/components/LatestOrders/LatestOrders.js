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
  TableSortLabel
} from '@material-ui/core';

import mockData from './data';

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

  const [orders] = useState(mockData);

  useEffect(() => {
    (async () => {
      // let { data } = axios.get('http://localhost:5000/getSales', {
      //   params: {
      //     email: 'sbsiddharth@gmail.com'
      //   },
      //   headers: {
      //     auth:
      //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZjFjMjdmY2U1ZDFhZTI3MWNhY2I3ZmIiLCJpYXQiOjE1OTU2ODA5ODU2Mzd9.qTL9y5_YWHmPrNeA6sWlzRFlUAGAr2wcwItlRhBFvF8'
      //   }
      // });
      // console.log(data);
    })();
  }, []);

  // const response  =
  // console.log(response);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
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
                {orders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
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
