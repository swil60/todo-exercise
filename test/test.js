    import { expect } from "chai"
    import todos from  "../src/store/modules/todos"

    describe('to do mutation tests', () => {
        it('set todo', () => {
        // mock state
        const state = { all:[] }
        const data = [
            {
                "id": 1,
                "description": "test 1",
                "is_complete": false
            },
            {
                "id": 2,
                "description": "test 2",
                "is_complete": false
            }
        ];        
        // apply mutation
        todos.mutations.setTodos(state,data)
        // assert result
        expect(state.all).to.equal(data)
        })

        it('add a new todo', () => {
            // mock state
            const state = { all:[] }
            const data = {
                "description": "Test this thing",
                "is_complete": false
            };
            
            const expectedMember = {
                "id":1, //it will have a new property id
                "description": "Test this thing",
                "is_complete": false
        };

            // apply mutation
            todos.mutations.createTodo(state,data)
            // assert result
        expect(state.all).to.have.deep.include(expectedMember)
        })

        it('update the todo ', () => {
            // mock state
            const state = { all:[
                {
                    "id": 1,
                    "description": "test 1",
                    "is_complete": false
                },
                {
                    "id": 2,
                    "description": "test 2",
                    "is_complete": false
                }
            ]}
        
            const todoUpdate = {
                "id": 2,
                "description": "This is an update",
                "is_complete": true
            }

            // apply mutation
            todos.mutations.updateTodo(state,todoUpdate)
            // assert result
            expect(state.all).to.deep.include(todoUpdate)
        })

        it('mark all as done', () => {
            // mock state
            const state = { all:[
                {
                    "id": 1,
                    "description": "test 1",
                    "is_complete": false
                },
                {
                    "id": 2,
                    "description": "test 2",
                    "is_complete": false
                }
            ]}
        
            // apply mutation
            todos.mutations.markAllToDosAsDone(state)
            state.all.forEach(todo=>{
                expect(todo).to.include({"is_complete": true})
            })
            // assert result
        })
    })