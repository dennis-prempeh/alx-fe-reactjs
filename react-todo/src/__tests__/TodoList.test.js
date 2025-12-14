import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);

    // Check if the title is rendered
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("displays todos with correct initial completion status", () => {
    render(<TodoList />);

    // Check that "Learn React" is not completed (no strikethrough)
    const learnReact = screen.getByText("Learn React");
    expect(learnReact).toBeInTheDocument();
    expect(learnReact.closest("li")).not.toHaveClass("completed");

    // Check that "Build Todo App" is completed
    const buildTodoApp = screen.getByText("Build Todo App");
    expect(buildTodoApp).toBeInTheDocument();
    expect(buildTodoApp.closest("li")).toHaveClass("completed");

    // Check that "Write Tests" is not completed
    const writeTests = screen.getByText("Write Tests");
    expect(writeTests).toBeInTheDocument();
    expect(writeTests.closest("li")).not.toHaveClass("completed");
  });

  test("adds a new todo when form is submitted", () => {
    render(<TodoList />);

    // Get the input and button
    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");

    // Type a new todo
    fireEvent.change(input, { target: { value: "New Test Todo" } });

    // Submit the form
    fireEvent.click(addButton);

    // Check if the new todo is added
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Check that input is cleared after submission
    expect(input.value).toBe("");
  });

  test("does not add empty todo when form is submitted", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");

    // Try to submit with empty input
    fireEvent.click(addButton);

    // Count should remain the same (3 initial todos)
    const todos = screen.getAllByRole("listitem");
    expect(todos).toHaveLength(3);
  });

  test("toggles todo completion status when clicked", () => {
    render(<TodoList />);

    const learnReact = screen.getByText("Learn React");
    const learnReactLi = learnReact.closest("li");

    // Initially not completed
    expect(learnReactLi).not.toHaveClass("completed");

    // Click to toggle
    fireEvent.click(learnReact);

    // Should now be completed
    expect(learnReactLi).toHaveClass("completed");

    // Click again to toggle back
    fireEvent.click(learnReact);

    // Should be not completed again
    expect(learnReactLi).not.toHaveClass("completed");
  });

  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);

    // Initially should have 3 todos
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    // Find the delete button for "Learn React"
    const learnReact = screen.getByText("Learn React");
    const deleteButton = learnReact.closest("li").querySelector("button");

    // Click delete
    fireEvent.click(deleteButton);

    // Should now have 2 todos
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // "Learn React" should no longer be in the document
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();

    // Other todos should still be there
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  test("trims whitespace from todo text", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const addButton = screen.getByText("Add Todo");

    // Type a todo with leading/trailing whitespace
    fireEvent.change(input, { target: { value: "  Todo with spaces  " } });
    fireEvent.click(addButton);

    // Should be trimmed
    expect(screen.getByText("Todo with spaces")).toBeInTheDocument();
    expect(screen.queryByText("  Todo with spaces  ")).not.toBeInTheDocument();
  });
});
