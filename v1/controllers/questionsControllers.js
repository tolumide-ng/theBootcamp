import questionsModels from '../models/questionsModels';
import meetupsModels from '../models/meetupsModels';
import usersModels from '../models/usersModels'

const Questions = {
    createQuestion(req, res) {
        const data = req.body;
        if(!data.title && !data.body
            && !data.meetupId && !data.user
            && !data.questionId && !data.upvotes
            && !data.downvotes) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const createdQuestion = questionsModels.askQuestion(req.body);
            return releaseEvents.status(201).json({
                createdBy: createdQuestion.createdBy,
                meetupId: createdQuestion.meetupId,
                questionId: createdQuestion.questionId, 
                body: createdQuestion.body,
                title: createdQuestion.title,
                upvote: createdQuestion.upvote,
                downvote: createdQuestion.downvote,
                Post: {
                    type: 'GET',
                    url: `http://localhost:3000/v1/meetups/${createdQuestion.meetupId}`,
                  },
                  upVote_Question: {
                    type: 'PATCH',
                    url: `http://localhost:3000/v1/questions/${createdQuestion.questionId}/upvote`,
                  },
                  downVote_Question: {
                    type: 'PATCH',
                    url: `http://localhost:3000/v1/questions/${createdQuestion.questionId}/downvote`,
                  },
            });
    }, 

    getAllQuestions(req, res) {
        const data = req.params.meetupId;
        const allQuestions = questionsModels.getMeetupQuestions(data);
        const count = allquestions.length;
        if(count > 0) {
            return res.status(200).json({
                data: allquestions.map(question => ({
                    createdBy: question.createdBy,
                    meetupId: question.meetupId, 
                    title: question.title, 
                    body: question.body,
                    upvote: question.upvote,
                    downvote: question.downvote
                }))
            });
        }
        return res.status(404).json({
            message: 'No questions for this meetup'
        })
    }, 

    delete(req, res) {
        const deleted = questionsModels.delete(req.params.questionId);
        if(Array.isArray(deleted)) {
            return res.status(202).json({
                count: deleted.length,
                data: deleted.map(undeleted => ({
                    createdBy: undeleted.createdBy,
                    meetupId: undeleted.meetupId,
                    title: undeleted.title,
                    body: undeleted.body,
                    upvotes: undeleted.upvotes,
                    downvotes: undeleted.downvotes,
                  })),
            });
        }
        return res.status(404).json({
            message: 'Question not found',
        });
    },

    upvote(req, res) {
        const theQuestion = questionsModels.forDel(data.questionId);
        // does the user exist
        const theUser = usersModels.findUser(data.userId);
        // does the meetup exist
        const theMeetup = meetupsModels.getOne(data.meetupId);
        if(theQuestion && theUser && theMeetup){
            const upvoteQuestion = questionsModels.requestUpvote(req.body);
            return res.status(200).json({
                downvote: upvoteQuestion.downvote,
                upvote: upvoteQuestion.upvote
            });
        }
        return res.status(404).json({
            message: 'Not found'
        });
    },

    downvote(req, res) {
        //does the question exist
        const theQuestion = questionsModels.forDel(data.questionId);
        // does the user exist
        const theUser = usersModels.findUser(data.userId);
        // does the meetup exist
        const theMeetup = meetupsModels.getOne(data.meetupId);
        if(theQuestion && theUser && theMeetup){
            const upvoteQuestion = questionsModels.requestDownvote(req.body);
            return res.status(200).json({
                downvote: upvoteQuestion.downvote,
                upvote: upvoteQuestion.upvote
            });
        }
        return res.status(404).json({
            message: 'Not found'
        });
    }
}

export default Questions;