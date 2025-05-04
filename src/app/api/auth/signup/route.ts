import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import connect from '@/lib/mongodb';

export async function POST(request: Request) {
    const { username, email, password, confirmPassword } = await request.json();

    const isValidEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    if (!username || !email || !password || !confirmPassword) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
        return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }
    if (password !== confirmPassword) {
        return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    try {
        await connect();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}