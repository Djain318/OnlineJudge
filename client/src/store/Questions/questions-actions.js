import { SERVER_LINK } from '../../dev-server-link';
import { questionsActions } from './questions-slice'

const EXTERNAL_API_URL = 'https://oj-server.amanarya.com/api/explore/problems';

export const fetchQuestionListData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(
                EXTERNAL_API_URL,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Could not fetch question data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            dispatch(questionsActions.setLoading({ isLoading: true }));
            const questionsData = await fetchData();
            dispatch(
                questionsActions.replaceQuestionsList({
                    questions: questionsData || [],
                })
            );
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(questionsActions.setLoading({ isLoading: false }));
        }
    };
};
