import React, { Fragment, useState } from 'react'
import PropTypes, { func } from 'prop-types'
import { Input, Button, Form, Row, Col } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const messageFormType = {
	onSend: func.isRequired,
};

export default function MessageForm(props) {
	const [author, setAuthor] = useState('')
	const [form] = Form.useForm();

	const handleFormFinish = (val) => {
		if (val.author) if (val.author.trim()) setAuthor(val.author)
Ч
		if (val.text) {
			if (!val.text.trim()) return
			const text = val.text.trim().split('\n').map((item, key) => { //чтобы перенос строки в textarea работал
				return <Fragment key={key}><br />{item}</Fragment>
			})
			props.onSend({ author, text })
			form.resetFields()
		}
	};

	const handleKeyCombo = (event) => {
		if (event.ctrlKey && event.keyCode === 13) {
			handleFormFinish({ text: event.target.value.trim() })
		}
	}

	return (
		<Form
			form={form}
			onFinish={handleFormFinish}
			style={{
				background: '#f0f2f5',
				padding: '10px'
			}}>
			<Row>
				<Col span={20}>
					{author ? //запрос ввести автора, если в состоянии его нет
						<Form.Item name="text">
							<Input.TextArea
								autoSize={{ minRows: 1, maxRows: 5 }}
								placeholder="Введите сообщение"
								onKeyDown={handleKeyCombo}
								autoFocus
							/>
						</Form.Item>
						:
						<Form.Item
							name="author"
							rules={[
								{
									required: true,
									message: 'Ваше имя не может быть пустым',
								},
							]}
						>
							<Input placeholder="Ваше имя" addonBefore="Введите своё имя: " />
						</Form.Item>
					}
				</Col>
				<Col span={4}>
					<Form.Item>
						<Button
							style={{ width: '100%' }}
							type="primary"
							htmlType="submit"
						>
							<SendOutlined />Отправить
                        </Button>
					</Form.Item>
				</Col>
			</Row>
		</Form >
	)
}

MessageForm.propTypes = messageFormType