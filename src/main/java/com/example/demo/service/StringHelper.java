package com.example.demo.service;

public class StringHelper {
	public boolean hasText(String str) {
		if (str != null && !str.isBlank()) {
			return true;
		}
		return false;
	}
}