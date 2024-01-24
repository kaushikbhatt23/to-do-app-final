import React from "react";
import { useSelector } from "react-redux";
import { TodoState } from "../redux/reducers/todoReducer";
import IndividualCard from "./IndividualCard";
import "./Cards.scss";
import { Todo } from "../redux/reducers/todoReducer";

export const Cards = () => {
  const data = useSelector((state: TodoState) => state.todos);
  const filter = useSelector((state: TodoState) => state.filter);
  const sortBy = useSelector((state: TodoState) => state.sortBy);
  const filteredData = data.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return item.completed;
    } else {
      return !item.completed;
    }
  });

  let sortedData = [...filteredData];

  switch (sortBy) {
    case "name":
      sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "priority":
      let low: Todo[] = [];
      let medium: Todo[] = [];
      let high: Todo[] = [];

      sortedData.forEach((item) => {
        if (item.priority === "low") {
          low.push(item);
        } else if (item.priority === "medium") {
          medium.push(item);
        } else {
          high.push(item);
        }
      });
      sortedData = [...high.concat(medium, low)];
      break;
  }

  return (
    <div className="container">
      {sortedData.map((item) => {
        return (
          <IndividualCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            completed={item.completed}
          />
        );
      })}
    </div>
  );
};