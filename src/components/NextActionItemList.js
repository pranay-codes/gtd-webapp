// src/components/NextActionItemList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/NextActionItemsSlice';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const NextActionItemList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.nextActionItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <List>
      {items.map(item => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.title}
            secondary={`Due: ${item.dueDate}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NextActionItemList;
