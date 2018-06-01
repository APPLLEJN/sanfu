//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
    	questionList: [
    		{question: 'question', answer: 'answer'}, 
    		{question: 'questionquestion', answer: 'answeranswer'}, 
    		{question: 'questionquestionquestion', answer: 'answeransweranswer'}
		],
		showAnswer: [true, true, true]
    },
    
    onLoad: function () {
        
    },
    tap: function(e) {
    	console.log(this.data.showAnswer)
    	const index = e.currentTarget.id
    	const arr = this.data.showAnswer
    	arr[index] = !this.data.showAnswer[index]
    	this.setData({
    		showAnswer: arr
    	})
    }
})