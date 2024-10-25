const Header = (props) => {
	return <h2>{props.course}</h2>;
};

const Part = (props) => {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	);
};

const Content = (props) => {
	return (
		<div>
			{props.parts.map((part) => (
				<Part key={part.id} part={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

const Total = (props) => {
	return (
		<div>
			<strong>
				Total of{" "}
				{props.parts.reduce((total, current) => total + current.exercises, 0)}{" "}
				exercises
			</strong>
		</div>
	);
};

const Course = (props) => {
	return (
		<>
			<Header course={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
			<br />
		</>
	);
};

export default Course;
