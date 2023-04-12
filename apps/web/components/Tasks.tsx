import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Heading,
  Text,
  css,
  Tooltip,
  Switch,
} from "@chakra-ui/react";
import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { useTaskContract } from "../hooks/useContract";
import moment from "moment";
import { filter, sortBy } from "lodash";

export const Tasks: React.FC = () => {
  const [hideCompleted, setHideCompleted] = useState(true);
  const { tasks, contract, markTaskCompleted, deleteTask, createTask } =
    useTaskContract();

  const [newTaskFormState, setNewTaskFormState] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    const key = event.target.id;
    setNewTaskFormState((prevState) => ({ ...prevState, [key]: newValue }));
  };

  const handleMarkCompleted = async (id: number) => {
    await markTaskCompleted(id);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const handleCreateTask: FormEventHandler = async (e) => {
    e.preventDefault();
    const { name, description, dueDate } = newTaskFormState;
    if (!name || !description || !dueDate) return;

    await createTask(name, description, dueDate);
    setNewTaskFormState({ name: "", description: "", dueDate: "" });
  };

  const sortedTasks = filter(
    sortBy(tasks, (task) => task.dueDate),
    (task) => !!task.name && (!task.completed || !hideCompleted)
  );

  return (
    <Flex
      color="white"
      flexDir="row"
      borderRadius={8}
      p={8}
      border="1px solid #474276"
      width="full"
    >
      <Flex flexDir="column" pr={8} flex={1}>
        <Heading color="white">New Task</Heading>

        <form onSubmit={handleCreateTask}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              id="name"
              onChange={handleChange}
              value={newTaskFormState.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              id="description"
              onChange={handleChange}
              value={newTaskFormState.description}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              id="dueDate"
              colorScheme="white"
              onChange={handleChange}
              value={newTaskFormState.dueDate}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={6}>
            Create Task
          </Button>
        </form>
      </Flex>
      <Flex flexDir="column" flex={2} width="full">
        <Flex justifyContent="space-between" w="full">
          <Box flex={1}>
            <Heading color="white">Current Tasks</Heading>
          </Box>
          <Flex flex={1}>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormLabel htmlFor="hide-completed" mb="0">
                Hide Completed
              </FormLabel>
              <Switch
                id="hide-completed"
                onChange={() => setHideCompleted(!hideCompleted)}
                isChecked={hideCompleted}
              />
            </FormControl>
          </Flex>
        </Flex>

        {sortedTasks.map((task) => (
          <Flex
            key={task.id.toString()}
            alignItems="center"
            justifyContent="space-between"
            width="full"
          >
            <Flex
              border="1px solid #474276"
              p={4}
              borderRadius={8}
              my={2}
              justifyContent="space-between"
              alignItems="center"
              bg="rgb(14, 10, 49)"
              width="full"
            >
              <Box minW="200px">
                <Text>{task.name}</Text>
                <Text fontSize="sm">{task.description}</Text>
              </Box>
              <Box>
                <Text>
                  {moment(task.dueDate.toNumber()).format("MM/DD/yyyy")}
                </Text>
              </Box>
              <ButtonGroup>
                <Tooltip
                  label={
                    task.completed
                      ? `Completed on ${moment(
                          task.completedDate.toNumber()
                        ).format("MM/DD/yyyy")}`
                      : ""
                  }
                >
                  <IconButton
                    variant="outline"
                    aria-label="Mark Task Completed"
                    icon={<CheckIcon color="blue.300" />}
                    borderColor="#474276"
                    _hover={{ bg: "#474276" }}
                    onClick={() => handleMarkCompleted(task.id.toNumber())}
                    isDisabled={task.completed}
                  />
                </Tooltip>
                <IconButton
                  variant="outline"
                  aria-label="Mark Task Completed"
                  icon={<DeleteIcon color="red.300" />}
                  borderColor="#474276"
                  _hover={{ bg: "#474276" }}
                  onClick={() => handleDeleteTask(task.id.toNumber())}
                />
              </ButtonGroup>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
