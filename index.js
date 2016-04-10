import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'ADD_MONEY',
  amount: 50
});

store.dispatch({
	type: 'ADD_MEMBERS',
	members: [
		{
			name: "jackson",
			number: "8783497",
			amount: 48
		},
		{
			name: "erar",
			number: "8783497",
			amount: 48
		},
		{
			name: "jackssdfsdon",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdffsd",
			number: "8783497",
			amount: 48
		},
		{
			name: "asdfsdfasdfhaskdfjklasdjflkasdjfklsjdfkldsjfkl",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdff",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdfds",
			number: "8783497",
			amount: 48
		},
		{
			name: "j",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdfsda",
			number: "8783497",
			amount: 48
		},
		{
			name: "jarfghdckson",
			number: "8783497",
			amount: 48
		},
		{
			name: "jacfghsdkson",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdfgds",
			number: "8783497",
			amount: 48
		},
		{
			name: "tgc",
			number: "8783497",
			amount: 48
		},
		{
			name: "dsfhsfdv",
			number: "8783497",
			amount: 48
		},
		{
			name: "jackssdfhon",
			number: "8783497",
			amount: 48
		},
		{
			name: "strgvdf",
			number: "8783497",
			amount: 48
		},
		{
			name: "dfghbfd",
			number: "8783497",
			amount: 48
		},
		{
			name: "dsfgsdr",
			number: "8783497",
			amount: 48
		},
		{
			name: "sdfhgv",
			number: "8783497",
			amount: 48
		},
		{
			name: "sfrtgf",
			number: "8783497",
			amount: 48
		},
	]
})