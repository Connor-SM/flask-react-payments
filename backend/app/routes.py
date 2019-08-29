from app import app
from flask import request, jsonify
import requests
import stripe

stripe.api_key = app.config['STRIPE_SECRET_KEY']


@app.route('/')
@app.route('/index')
def index():
    return ''


@app.route('/api/payment', methods=['GET', 'POST'])
def payment():
    token = request.headers.get('token')
    email = request.headers.get('email')
    amount = request.headers.get('amount')

    print('*************************************')
    print('*************************************')
    print('*************************************')
    print(token)
    print(email)
    print(amount)
    print('*************************************')
    print('*************************************')
    print('*************************************')

    customer = stripe.Customer.create(
        email=email,
        source=token
    )

    print(customer.id)

    # create a stripe charge
    charge = stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='usd',
        description='This was a test purchase for some test products'
    )

    print(charge)

    return jsonify({ 'message' : 'success' })


# be sure to remove what is not needed, fix route above
def oldPaymentRoute():
    amount = request.args.get('amount')
    email = request.form['stripeEmail']

    # create a stripe customer using stripes class
    customer = stripe.Customer.create(
        email=email,
        source=request.form['stripeToken']
    )

    # create a stripe charge
    charge = stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='usd',
        description='This was a test purchase for some test products'
    )

    return jsonify({
        'message' : 'success',
        'amount' : amount,
        'email' : email
    })
